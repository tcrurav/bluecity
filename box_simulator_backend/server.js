require('dotenv').config();

const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
// const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
const port = process.env.PORT || 9000;

// enable CORS
app.use(cors());

// parse application/json
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   // res.header("Access-Control-Allow-Origin", process.env.BLUECITY_CLIENT);
//   res.header("Access-Control-Allow-Origin", '*');
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

var socketWithBox = null;

const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    // origin: process.env.BLUECITY_CLIENT,
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket']
});

app.get("/hello", (req, res) => {
  return res.send({ response: "I am alive" }).status(200);
});

app.post("/open_box/:box_id", (req, res) => {
  //desde el backend
  console.log("/open_box in box backend");
  console.log(req.params.box_id);

  let data = { boxId: parseInt(req.params.box_id) };
  io.sockets.emit('simulator-open-box', data);

  return res.send({ response: "open-box sent" }).status(200);
});

// function PostCode(codestring) {
//   // Build the post string from an object
//   var post_data = querystring.stringify({
//     'compilation_level': 'ADVANCED_OPTIMIZATIONS',
//     'output_format': 'json',
//     'output_info': 'compiled_code',
//     'warning_level': 'QUIET',
//     'js_code': codestring
//   });

//   // An object of options to indicate where to post to
//   var post_options = {
//     host: process.env.BACKEND_HOST,
//     port: process.env.BACKEND_PORT,
//     path: '/open_box_confirmed',
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//       'Content-Length': Buffer.byteLength(post_data)
//     }
//   };

//   // Set up the request
//   var post_req = http.request(post_options, function (res) {
//     res.setEncoding('utf8');
//     res.on('data', function (chunk) {
//       console.log('Response: ' + chunk);
//     });
//   });

//   // post the data
//   post_req.write(post_data);
//   post_req.end();

// }

io.on("connect", (socket) => {
  console.log("New simulator_frontend connected");

  socketWithBox = socket;

  socket.emit("simulator-welcome", { connection_confirmed: true });

  // socket.on("open-box", (data) => {
  //   // from mobile phone
  //   console.log("open-box")
  //   console.log(data);

  //   // to box device
  //   io.sockets.emit('open-box', { boxId: data.id });
  // });

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


  //////////////////////////////////////////////////////////////////////////////
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

  ////////////////////////////////////////////////////////////////////////7

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

  // socket.on("something-changed", (data) => {
  //   console.log("something changed: " + data.toString());
  //   // socket.emit("refresh", data);      // send to only the client who emited

  //   io.sockets.emit('refresh', data);     // send to all
  // })

  socket.on("disconnect", () => {
    console.log("simulator_frontend disconnected");
  });
});

server.listen(port, () => {
  console.log('Server started on: ' + port);
});
