require('dotenv').config();

const fs = require("fs");

const express = require('express');

let http = null;
http = require("http");

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
server = http.createServer(app);

app.get("/hello", (req, res) => {
  return res.send({ response: "I am alive" }).status(200);
});

let parkingId = process.env.PLC_PARKING_ID;
let session = null;
let client = null;

async function closePLC() {
  // close session with PL
  await session.close();

  // disconnecting from PLC
  await client.disconnect();
}

async function writeToPLC(boxId, openBox, closeBox, reserve) {
  // to PLC 

  console.log(`ns=3;s="${process.env.PLC_BOX_ID}"`)
  var nodesToWrite = [{
    nodeId: `ns=3;s="${process.env.PLC_BOX_ID}"`,
    attributeId: nodeOpcua.AttributeIds.Value,
    indexRange: null,
    value: {
      value: {
        dataType: nodeOpcua.DataType.SByte,
        value: boxId
      }
    }
  }];

  if (openBox != null) {
    nodesToWrite.push({
      nodeId: `ns=3;s="${process.env.PLC_OPEN_BOX}"`,
        attributeId: nodeOpcua.AttributeIds.Value,
          indexRange: null,
            value: {
        value: {
          dataType: nodeOpcua.DataType.SByte,
            value: openBox ? 1 : 0
        }
      }
    });
  }

  if (closeBox != null) {
    nodesToWrite.push({
      nodeId: `ns=3;s="${process.env.PLC_CLOSE_BOX}"`,
        attributeId: nodeOpcua.AttributeIds.Value,
          indexRange: null,
            value: {
        value: {
          dataType: nodeOpcua.DataType.SByte,
            value: closeBox ? 1 : 0
        }
      }
    });
  }

  if (closeBox != null) {
    nodesToWrite.push({
      nodeId: `ns=3;s="${process.env.PLC_RESERVE}"`,
        attributeId: nodeOpcua.AttributeIds.Value,
          indexRange: null,
            value: {
        value: {
          dataType: nodeOpcua.DataType.SByte,
            value: reserve ? 1 : 0
        }
      }
    });
  }

  // var nodesToWrite = [{
  //   nodeId: `ns=3;s="${process.env.PLC_BOX_ID}"`,
  //   attributeId: nodeOpcua.AttributeIds.Value,
  //   indexRange: null,
  //   value: {
  //     value: {
  //       dataType: nodeOpcua.DataType.SByte,
  //       value: boxId
  //     }
  //   }
  // }, {
  //   nodeId: `ns=3;s="${process.env.PLC_OPEN_BOX}"`,
  //   attributeId: nodeOpcua.AttributeIds.Value,
  //   indexRange: null,
  //   value: {
  //     value: {
  //       dataType: nodeOpcua.DataType.SByte,
  //       value: openBox ? 1 : 0
  //     }
  //   }
  // }, {
  //   nodeId: `ns=3;s="${process.env.PLC_CLOSE_BOX}"`,
  //   attributeId: nodeOpcua.AttributeIds.Value,
  //   indexRange: null,
  //   value: {
  //     value: {
  //       dataType: nodeOpcua.DataType.SByte,
  //       value: closeBox ? 1 : 0
  //     }
  //   }
  // }, {
  //   nodeId: `ns=3;s="${process.env.PLC_RESERVE}"`,
  //   attributeId: nodeOpcua.AttributeIds.Value,
  //   indexRange: null,
  //   value: {
  //     value: {
  //       dataType: nodeOpcua.DataType.SByte,
  //       value: reserve ? 1 : 0
  //     }
  //   }
  // }];

  await session.write(nodesToWrite);
}

async function readFromPLC() {
  let nodesToRead = [{
    nodeId: `ns=3;s="${process.env.PLC_OPEN_BOX_CONFIRMED_1}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }, {
    nodeId: `ns=3;s="${process.env.PLC_OPEN_BOX_CONFIRMED_2}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }, {
    nodeId: `ns=3;s="${process.env.PLC_OPEN_BOX_CONFIRMED_3}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }, {
    nodeId: `ns=3;s="${process.env.PLC_DETECTOR_1}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }, {
    nodeId: `ns=3;s="${process.env.PLC_DETECTOR_2}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }, {
    nodeId: `ns=3;s="${process.env.PLC_DETECTOR_3}"`,
    attributeId: nodeOpcua.AttributeIds.Value
  }];

  const maxAge = 0;
  let dataValue = await session.read(nodesToRead, maxAge);
  // console.log(" dataValue ", dataValue.toString());

  return [{
    openBoxConfirmed: dataValue[0].value.value,
    detector: dataValue[3].value.value
  }, {
    openBoxConfirmed: dataValue[1].value.value,
    detector: dataValue[4].value.value
  }, {
    openBoxConfirmed: dataValue[2].value.value,
    detector: dataValue[5].value.value
  }];

}

async function openPlc() {
  // Using OPCUA to connect to PLC

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

  let lastDataFromPLC = await readFromPLC();
  console.log(lastDataFromPLC);

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
    console.log(`open-box received for Box nº ${data.boxId} in Parking nº ${data.parkingId}`)

    if (parkingId == data.parkingId) {
      // to PLC 

      // BoxId in PLC always start with 1. It's assumed that all parkings have 3 boxes.
      const boxIdInPLC = parseInt(data.boxId) - (parseInt(data.parkingId) - 1) * 3;
      const openBox = true;
      await writeToPLC(boxIdInPLC, openBox);
    }
  });

  socketClient.on("reserve-box", async (data) => {
    // from backend
    console.log(`reserve-box received for Box nº ${data.boxId} in Parking nº ${data.parkingId}`)

    if (parkingId == data.parkingId) {
      // to PLC 

      // BoxId in PLC always start with 1. It's assumed that all parkings have 3 boxes.
      const boxIdInPLC = parseInt(data.boxId) - (parseInt(data.parkingId) - 1) * 3;
      const openBox = false;
      const closeBox = false;
      const reserveBox = true;
      await writeToPLC(boxIdInPLC, openBox, closeBox, reserveBox);
    }
  });

  socketClient.on("unreserve-box", async (data) => {
    // from backend
    console.log(data)
    console.log(`unreserve-box received for Box nº ${data.boxId} in Parking nº ${data.parkingId}`)

    if (parkingId == data.parkingId) {
      // to PLC 

      // BoxId in PLC always start with 1. It's assumed that all parkings have 3 boxes.
      const boxIdInPLC = parseInt(data.boxId) - (parseInt(data.parkingId) - 1) * 3;
      const openBox = false;
      const closeBox = false;
      const reserveBox = false;
      await writeToPLC(boxIdInPLC, openBox, closeBox, reserveBox);
    }
  });

  //It shouldn't be an interval for ever. Only when the parking process starts
  setInterval(async function () {
    let newDataFromPLC = await readFromPLC();
    // console.log(" newDataFromPLC ", newDataFromPLC);

    let boxIdInBackend = 0;
    for (let i = 0; i < 3; i++) {
      boxIdInBackend = i + 1 + (parkingId - 1) * 3;
      if (lastDataFromPLC[i].openBoxConfirmed != newDataFromPLC[i].openBoxConfirmed) {
        if (newDataFromPLC[i].openBoxConfirmed == 1) {

          console.log("se emite open-box-confirmed")
          socketClient.emit("open-box-confirmed", { boxId: boxIdInBackend, parkingId });

          //Inform PLC that confirmation was received
          const boxId = i;
          const openBox = false;
          const closeBox = null;
          const reserveBox = null;
          await writeToPLC(boxId, openBox, closeBox, reserveBox);
        } else {
          console.log("se emite box-closed")
          socketClient.emit("box-closed", { boxId: boxIdInBackend, parkingId });

          //Inform PLC that confirmation was received
          const boxId = i;
          const openBox = null;
          const closeBox = false;
          const reserveBox = null;
          await writeToPLC(boxId, openBox, closeBox, reserveBox);
        }
        lastDataFromPLC[i].openBoxConfirmed = newDataFromPLC[i].openBoxConfirmed;
      }

      if (lastDataFromPLC[i].detector != newDataFromPLC[i].detector) {
        if (newDataFromPLC[i].detector == 1) {
          console.log("se emite charger-plugged-in")
          socketClient.emit("charger-plugged-in", { boxId: boxIdInBackend, parkingId });
        } else {
          console.log("se emite charger-unplugged")
          socketClient.emit("charger-unplugged", { boxId: boxIdInBackend, parkingId });
        }
        lastDataFromPLC[i].detector = newDataFromPLC[i].detector;
      }
    }

  }, process.env.PLC_POOLING_TIME);

  server.on('close', function () {
    console.log(' Stopping ...');

    closePLC();
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

  app.post("/open_box_renting_in/:box_id", (req, res) => {
    console.log("open_box_renting_in in box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box-renting-in', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  app.post("/open_box_renting_out/:box_id", (req, res) => {
    console.log("/open_box_renting_out in box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box-renting-out', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  app.post("/open_box_parking_in/:box_id", (req, res) => {
    console.log("/open_parking_box in box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box-parking-in', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  app.post("/open_box_parking_out/:box_id", (req, res) => {
    console.log("/open_parking_box out box backend");
    console.log(req.params.box_id);

    let data = { boxId: parseInt(req.params.box_id) };
    io.sockets.emit('simulator-open-box-parking-out', data);

    return res.send({ response: "open-box sent" }).status(200);
  });

  io.on("connect", (socket) => {
    console.log("New simulator_frontend connected");

    socketWithBox = socket;

    socket.emit("simulator-welcome", { connection_confirmed: true });

    socket.on("welcome", (data) => {
      console.log("welcome received from simulator backend")
    });

    /* Renting pulling scooter in */
    socket.on("simulator-open-box-confirmed", (data) => {
      console.log("simulator-open-box-confirmed")

      axios.post(`${process.env.BACKEND_URL}/open_box_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open-box-confirmed sent")
        })
        .catch(error => {
          console.error(error)
        });
    });

    socket.on("simulator-charger-connected", (data) => {
      console.log("La orden ha sido recibida, simulator-charger-connected")
      axios.post(`${process.env.BACKEND_URL}/charger_connected/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("charger_connected sent")
        })
        .catch(error => {
          console.error("Ha fallado amigo mío" + error.message)
        });
    });

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

    /* Renting pulling scooter out */
    socket.on("simulator-open-renting-box-confirmed", (data) => {
      console.log("simulator-open-box-confirmed")

      axios.post(`${process.env.BACKEND_URL}/open_renting_box_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open-renting-box-confirmed sent")
        })
        .catch(error => {
          console.error("Ha fallado lo de siempre" + error.message)
        });
    });

    socket.on("simulator-renting-scooter-charger-unplugged", (data) => {
      console.log("simulator-scooter-charger-unplugged")
      axios.post(`${process.env.BACKEND_URL}/renting_charger_unplugged/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_unplugged sent")
        })
        .catch(error => {
          console.error("El charger unplugged ha fallado " + error.message)
        });
    });

    socket.on("simulator-renting-box-closed", (data) => {
      console.log("simulator-renting-box-closed")
      axios.post(`${process.env.BACKEND_URL}/renting_box_closed/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box-closed sent")
        })
        .catch(error => {
          console.error("Renting box closed ha fallado " + error.message)
        });
    });

    /* Parking pulling scooter in */
    socket.on("simulator-open-box-parking-in-confirmed", (data) => {
      console.log("simulator-open-box-parking-in-confirmed")
      axios.post(`${process.env.BACKEND_URL}/open_box_parking_in_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open_box_parking_in sent")
        })
        .catch(error => {
          console.error("Open parking in box ha fallado " + error.message)
        });
    });

    socket.on("simulator-charger-connected-parking-in", (data) => {
      console.log("simulator-charger-connected-parking-in-confirmed")
      axios.post(`${process.env.BACKEND_URL}/charger_connected_parking_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_connected_parking_in sent")
        })
        .catch(error => {
          console.error("Charger connected parking in box ha fallado " + error.message)
        });
    });

    socket.on("simulator-box-closed-parking-in", (data) => {
      console.log("simulator-box-closed-parking-in-confirmed")
      axios.post(`${process.env.BACKEND_URL}/box_closed_parking_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box_closed_parking_in sent")
        })
        .catch(error => {
          console.error("Close parking in box ha fallado " + error.message)
        });
    });


    /* Parking pulling scooter out */

    socket.on("simulator-open-box-parking-out-confirmed", (data) => {
      console.log("simulator-open-box-parking-out-confirmed")
      axios.post(`${process.env.BACKEND_URL}/open_box_parking_out_confirmed/${data.parkingId}/${data.boxId}`)
        .then(res => {
          console.log("open_box_parking_out sent")
        })
        .catch(error => {
          console.error("Open parking out box ha fallado " + error.message)
        });
    });

    socket.on("simulator-charger-unplugged-parking-out", (data) => {
      console.log("simulator-charger-unplugged-parking-out-confirmed")
      axios.post(`${process.env.BACKEND_URL}/charger_unplugged_parking_out/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("charger_unplugged_parking_out sent")
        })
        .catch(error => {
          console.error("Close parking out box ha fallado " + error.message)
        });
    });

    socket.on("simulator-box-closed-parking-out", (data) => {
      console.log("simulator-box-closed-parking-out-confirmed")
      axios.post(`${process.env.BACKEND_URL}/box_closed_parking_out/${data.parkingId}/${data.boxId}/${data.chargerState}`)
        .then(res => {
          console.log("box_closed_parking_out sent")
        })
        .catch(error => {
          console.error("Close parking out box ha fallado " + error.message)
        });
    });

    socket.on("disconnect", () => {
      console.log("simulator_frontend disconnected");
    });
  });
}

server.listen(port, () => {
  console.log('Server started on: ' + port);
});