require('dotenv').config();

const fs = require("fs");

const express = require('express');

//Using http
let http = null;
// if (process.env.HTTPS == "false") {
http = require("http");
// }

//Using https
// let https = null;
// let fs = null;
// let options = null;

// if (process.env.HTTPS == "true") {
//   https = require('https');
//   fs = require('fs');
//   options = {
//     key: fs.readFileSync('.cert/certificate.key'),
//     cert: fs.readFileSync('.cert/certificate.crt')
//   };
// }

// NOT USING_WEBSOCKETS to connect to backend, but using to box_simulator_frontend
const socketIo = require("socket.io");
const axios = require('axios');

// USING_WEBSOCKETS to connect to backend
const ioClient = require("socket.io-client");
const nodeOpcua = require('node-opcua');

const cors = require('cors');

const app = express();
const port = process.env.PORT || 9000;

// enable CORS
app.use(cors());

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


//Using http
let server = null;
// if (process.env.HTTPS == "false") {
server = http.createServer(app);
// }

//Using https
// if (process.env.HTTPS == "true") {
//   server = https.createServer(options, app);
// }

app.get("/hello", (req, res) => {
  return res.send({ response: "I am alive" }).status(200);
});

let parkingId = null;
let boxId = null;
let session = null;
let client = null;

async function closePLC() {
  // close session with PL
  await session.close();

  // disconnecting from PLC
  await client.disconnect();
}

async function openPlc() {
  // Using OPCUA to connect to PLC

  const maxAge = 0;

  const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
  }
  const opcuaOptions = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: nodeOpcua.MessageSecurityMode.None,
    securityPolicy: nodeOpcua.SecurityPolicy.None,
    endpoint_must_exist: false,
  };
  client = nodeOpcua.OPCUAClient.create(opcuaOptions);
  const endpointUrl = process.env.PLC_OPCUA_URL;

  // step 1 : connect to
  await client.connect(endpointUrl);
  console.log("connected !");

  // step 2 : createSession
  session = await client.createSession();
  console.log("session created !");

  let nodeToRead = {
    nodeId: `ns=3;s="${process.env.PLC_BOX_ID_VARIABLE}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  };
  dataValue = await session.read(nodeToRead, maxAge);
  // console.log(" value ", dataValue.toString());
  boxId = dataValue.value.value;

  nodeToRead = {
    nodeId: `ns=3;s="${process.env.PLC_PARKING_ID_VARIABLE}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  };
  dataValue = await session.read(nodeToRead, maxAge);
  // console.log(" value ", dataValue.toString());
  parkingId = dataValue.value.value;

  let door_variable = null;
  let charger_variable = null;

  let socketClient = ioClient(process.env.BACKEND_URL, {
    withCredentials: true,
    transports: ['polling', 'websocket'],
    ca: fs.readFileSync(".cert/certificate.ca.crt")
  });

  socketClient.on("welcome", async (data) => {
    console.log("welcome received from backend")
  });

  socketClient.on("open-box", async (data) => {
    // from backend
    console.log(`open-box received for Box nº ${data.boxId}`)

    if (boxId == data.boxId) {
      // to PLC 
      var nodesToWrite = [{
        nodeId: `ns=3;s="${process.env.PLC_DOOR_VARIABLE}"`,
        attributeId: nodeOpcua.AttributeIds.Value,
        indexRange: null,
        value: {
          value: {
            dataType: nodeOpcua.DataType.Boolean,
            value: true
          }
        }
      }];
      await session.write(nodesToWrite);
    }
  });

  setInterval(async function () {
    // console.log(`ns=3;s=${process.env.PLC_DOOR_VARIABLE}`);
    let nodeToRead = {
      nodeId: `ns=3;s="${process.env.PLC_DOOR_VARIABLE}"`,
      attributeId: nodeOpcua.AttributeIds.Value
    };
    let dataValue = await session.read(nodeToRead, maxAge);
    // console.log(" value ", dataValue.toString());
    // console.log(door_variable)

    if (door_variable != dataValue.value.value) {
      if (door_variable != null) {
        if (dataValue.value.value == true) {
          console.log("se emite open-box-confirmed")
          socketClient.emit("open-box-confirmed", { boxId, parkingId });
        } else {
          console.log("se emite box-closed")
          socketClient.emit("box-closed", { boxId, parkingId });
        }
      }
      door_variable = dataValue.value.value;
    }

    nodeToRead = {
      nodeId: `ns=3;s="${process.env.PLC_CHARGER_VARIABLE}"`,
      attributeId: nodeOpcua.AttributeIds.Value
    };
    dataValue = await session.read(nodeToRead, maxAge);
    // console.log(" value ", dataValue.toString());
    // console.log(door_variable)

    if (charger_variable != dataValue.value.value) {
      if (charger_variable != null) {
        if (dataValue.value.value == true) {
          // console.log("se emite")
          socketClient.emit("charger-plugged-in", { boxId, parkingId });
        } else {
          // console.log("se emite")
          socketClient.emit("charger-unplugged", { boxId, parkingId });
        }
      }
      charger_variable = dataValue.value.value;
    }

  }, process.env.PLC_POOLING_TIME);

  server.on('close', function () {
    console.log(' Stopping ...');

    if (process.env.USING_WEBSOCKETS == "true") {
      closePLC();
    }
  });
}

if (process.env.USING_WEBSOCKETS == "true") {
  openPlc();
}

let io = null;
if (process.env.USING_WEBSOCKETS == "false") {
  io = socketIo(server, {
    cors: {
      // origin: process.env.BLUECITY_CLIENT,
      origin: '*',
      methods: ["GET", "POST"],
      credentials: true
    },
    transports: ['polling', 'websocket']
  });

  app.post("/open_box/:box_id", (req, res) => {
    //desde el backend

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  app.post("/open_box/:box_id", (req, res) => {
    //desde el backend
    console.log("/open_box in box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  app.post("/open_renting_box/:box_id", (req, res) => {
    console.log("/open_renting_box in box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-renting-box', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  io.on("connect", (socket) => {

    socket.emit("simulator-welcome", { connection_confirmed: true });

    socket.on("welcome", (data) => {
      console.log("welcome received from simulator backend")
    })

    socket.on("simulator-box-closed", (data) => {
      // from box device
      console.log("simulator-box-closed")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/box_closed/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box-closed sent")
          // console.log(`statusCode: ${res.statusCode}`)
          // console.log(res)
        })
        .catch(error => {
          console.error(error)
        });

    });

    socket.on("simulator-charger-plugged-in", (data) => {
      // from box device
      console.log("simulator-charger-plugged-in")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/charger_plugged_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_plugged_in sent")
          // console.log(`statusCode: ${res.statusCode}`)
          // console.log(res)
        })
        .catch(error => {
          console.error(error)
        });

    });

    socket.on("simulator-open-box-confirmed", (data) => {
      // from box device
      console.log("simulator-open-box-confirmed")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/open_box_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open-box-confirmed sent")
          //console.log(`statusCode: ${res.statusCode}`)
          //console.log(res)
        })
        .catch(error => {
          console.error(error)
        });
    });

    /* Renting pulling scooter in */
    socket.on("simulator-open-box-confirmed", (data) => {
      console.log("simulator-open-box-confirmed")
      console.log(`${process.env.BACKEND_URL}/open_box_confirmed/${data.parkingId}/${data.boxId}`);

      axios.post(`${process.env.BACKEND_URL}/open_box_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open-box-confirmed sent")
        })
        .catch(error => {
          console.error(error)
        });
    });

    //Scooter plugged
    socket.on("simulator-charger-connected", (data) => {
      console.log("La orden ha sido recibida, simulator-charger-connected")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/charger_connected/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("charger_connected sent")
        })
        .catch(error => {
          console.error("Ha petado amigo mío" + error.message)
        });
    });

    //Close door
    socket.on("simulator-box-closed", (data) => {
      console.log("simulator-box-closed")
      axios.post(`${process.env.BACKEND_URL}/box_closed/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box-closed sent")
        })
        .catch(error => {
          console.error(error)
        });
    });

    socket.on("simulator-renting-box-closed", (data) => {
      console.log("simulator-renting-box-closed")
      axios.post(`${process.env.BACKEND_URL}/renting_box_closed/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box-closed sent")
        })
        .catch(error => {
          console.error("Renting box closed ha petado " + error.message)
        });
    });

    socket.on("simulator-renting-scooter-charger-unplugged", (data) => {
      console.log("simulator-scooter-charger-unplugged")
      console.log(data);
      axios.post(`${process.env.BACKEND_URL}/renting_charger_unplugged/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_unplugged sent")
        })
        .catch(error => {
          console.error("El charger unplugged ha petado " + error.message)
        });
      return res.send({ response: "open-box sent" }).status(200);
    });

    socket.on("simulator-charger-plugged-in", (data) => {
      // from box device
      console.log("simulator-charger-plugged-in")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/charger_plugged_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_plugged_in sent")
          // console.log(`statusCode: ${res.statusCode}`)
          // console.log(res)
        })
        .catch(error => {
          console.error("Ha petado lo de siempre" + error.message)
        });
    });

    /* Renting pulling scooter out */
    socket.on("simulator-open-renting-box-confirmed", (data) => {
      console.log("simulator-open-box-confirmed")
      console.log(data);

      axios.post(`${process.env.BACKEND_URL}/open_renting_box_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open-renting-box-confirmed sent")
        })
        .catch(error => {
          console.error("Ha petado lo de siempre" + error.message)
        });
    });

    // socket.on("something-changed", (data) => {
    //   console.log("something changed: " + data.toString());
    //   // socket.emit("refresh", data);      // send to only the client who emited

    //   io.sockets.emit('refresh', data);     // send to all
    // })

    socket.on("disconnect", () => {
      console.log("simulator_frontend disconnected");
    });
  });
}

server.listen(port, () => {
  console.log('Server started on: ' + port);
});




