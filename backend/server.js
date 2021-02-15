require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');
const http = require("http");
const socketIo = require("socket.io");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 4000;



// enable CORS
app.use(cors());
// app.options('*', cors()); // include before other routes

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
//   res.header('Access-Control-Allow-Credentials', true);
//   res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//   res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//   next();
// });

// var whitelist = [
//   'http://localhost:3000', 
//   'https://bluecity.azurewebsites.net',
//   // "http://bluecityapp-bluecity.apps.us-west-1.starter.openshift-online.com", 
//   /** other domains if any */ ]
// var corsOptions = {
//   credentials: true,
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

// app.use(cors(corsOptions));

// var allowlist = [
//   'http://localhost:3000', 
//   'https://bluecity.azurewebsites.net',
//   // "http://bluecityapp-bluecity.apps.us-west-1.starter.openshift-online.com", 
//   /** other domains if any */ ]
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions;
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate));

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// pathing to parkings images
app.use(express.static('data/img'));

// database conection
const db = require("./models");

// For explotation. Database is not dropped.
db.sequelize.sync();

// Development only. Drops and re-sync db everytime the server starts.
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['authorization'];
  if (!token) return next(); //if no token, continue

  token = token.replace('Bearer ', '');
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Invalid user."
      });
    } else {
      req.user = user; //set the user to req so other routes can use it
      req.token = token;
      next();
    }
  });
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.BLUECITY_CLIENT);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

// Add headers
// app.use(function (req, res, next) {

//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

//   // Request methods you wish to allow
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//   // Request headers you wish to allow
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', true);

//   // Pass to next layer of middleware
//   next();
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://bluecityapp-bluecity.apps.us-west-1.starter.openshift-online.com"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.get("/api/hello", (req, res) => {
  return res.send({ response: "I am alive" }).status(200);
});

require("./routes/user.routes")(app);
require("./routes/parking.routes")(app);
require("./routes/box.routes")(app);
require("./routes/scooter.routes")(app);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.BLUECITY_CLIENT,
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket']
});

io.on("connect", (socket) => {
  console.log("New client connected");

  socket.emit("hola", { connection_confirmed: true });

  socket.on("chacho-tu", (data) => {
    console.log("openToIntroduceScooter")
    console.log(data);

    // socket.emit("openToIntroduceScooter", {open_to_introduce_scooter: true});
  });

  socket.on("something-changed", (data) => {
    console.log("something changed: " + data.toString());
    // socket.emit("refresh", data);      // send to only the client who emited
    io.sockets.emit('refresh', data);     // send to all
  })

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(port, () => {
  console.log('Server started on: ' + port);
});
