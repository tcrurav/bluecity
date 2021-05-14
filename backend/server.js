require('dotenv').config();

const jwt = require('jsonwebtoken');
const express = require('express');

//Using http
let http = null;
if(process.env.HTTPS == "false"){
  http = require("http");
} 

// set up plain http server for redirection to https
// var http = express();

// set up a route to redirect http to https
// http.get('*', function(req, res) {  
//     // res.redirect('https://' + req.headers.host + req.url);

//     // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
//     res.redirect('https://somosbluecity.es' + req.url);
// })

// have it listen on 80
// http.listen(80);

//Using https
let https = null;
let fs = null;
let options = null;

if(process.env.HTTPS == "true"){
  console.log("hola");
  https = require('https');
  fs = require('fs');
  options = {
    key: fs.readFileSync('.cert/certificate.key'),
    cert: fs.readFileSync('.cert/certificate.crt')
  };
} 

const socketIo = require("socket.io");
const cors = require('cors');
// const bodyParser = require('body-parser');
const axios = require('axios')

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
app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
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
      req.token = token; //AQUÍ
      next();
    }
  });
});

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", process.env.BLUECITY_CLIENT);
  res.header("Access-Control-Allow-Origin", '*');
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

/* Renting out app post methods        -- RENTING, PULLING OUT -- */
app.post("/open_renting_box_confirmed/:parking_id/:box_id", (req, res) => {
  // From Box
  console.log("open_renting_box_confirmed in backend")

  const data = { boxId: parseInt(req.params.box_id) };

  Box.update({ state: RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED }, {
   where: { id: data.boxId }
   }).then(num => {
    if (num == 1) {
      io.sockets.emit("renting-box-opened", { connection_confirmed: true });
      io.sockets.emit('refresh-box-state', data);
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
    }).catch(err => {
    // Error updating Box. It should be controlled in the future.
	});
  return res.send({ response: "open-box sent" }).status(200);
});

app.post("/renting_charger_unplugged/:parking_id/:box_id/:charger_state", (req, res) => {
  // From Box

  const data = { boxId: parseInt(req.params.box_id) };

  Box.update({ state: RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED, occupied: false }, {  //dónde está la constante definida??
    where: { id: data.boxId }                                                                         //false, se saca el patinete
  }).then(num => {
    if (num == 1) {
	  console.log('charger unplugged received from box backend')
	  io.sockets.emit('renting_charger_unplugged', data)
      io.sockets.emit('refresh-box-state', data);
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
  }).catch(err => {
    // Error updating Box. It should be controlled in the future.
  });
});
app.post("/renting_box_closed/:parking_id/:box_id/:charger_state", (req, res) => {
  const data = { boxId: parseInt(req.params.box_id) };
  const timeOfReservation = new Date();
  Box.update({ state: RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED, occupied: true, lastReservationDate: timeOfReservation }, {
    where: { id: data.boxId }
  }).then(num => {
    if (num == 1) {
	  console.log("box_closed received from box backend");
      io.sockets.emit('refresh-box-state', data);
	  io.sockets.emit("renting-box-closed-confirmed", { connection_confirmed: true });
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
  }).catch(err => {
    // Error updating Box. It should be controlled in the future.
  });
  
  /*
  Scooter.update({userId: getCleanUser.id}, {where: { BoxId: data.boxId, userId: null }
  }).then(num => {
    if (num == 1) {
	  console.log("HOLAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA Scooter actualizado");
	  // Raro?
    } else {
		console.log("NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
		// Cannot update Box with id. Maybe Box was not found
    }
  }).catch(err => {
	  console.log("Something went wrong " + err.message)
  });
  */
  return res.send({ response: "renting-box-closed received" }).status(200); 
});

/* Renting in app post methods        -- RENTING, PULLING IN -- */   
app.post("/open_box_confirmed/:parking_id/:box_id", (req, res) => {
  // From Box
  console.log("open_box_confirmed in backend")

  const data = { boxId: parseInt(req.params.box_id) };

  Box.update({ state: RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED }, {
    where: { id: data.boxId }
  }).then(num => {
    if (num == 1) {
      // refresh information in mobile phones
      io.sockets.emit('refresh-box-state', data);
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
  }).catch(err => {
    // Error updating Box. It should be controlled in the future.
  });

  return res.send({ response: "open-box sent" }).status(200);
});

app.post("/charger_connected/:parking_id/:box_id", (req, res) => {

  const data = { boxId: parseInt(req.params.box_id) };

  Box.update({ state: RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED, occupied: true }, {
    where: { id: data.boxId }
    }).then(num => {
    if (num == 1) {
      console.log("charger_connected received from box backend");
      io.sockets.emit("simulator-charger-connected", { connection_confirmed: true });
      io.sockets.emit('refresh-box-state', data);
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
    }).catch(err => {
	  console.log("Something is broken guys ...")
    });

  return res.send({ response: "charger-connected received" }).status(200);
});

app.post("/box_closed/:parking_id/:box_id/:charger_state", (req, res) => {
  const data = { boxId: parseInt(req.params.box_id) };

  Box.update({ state: RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED, occupied: true, userId: null }, {
    where: { id: data.boxId }
    }).then(num => {
    if (num == 1) {
      console.log("box_closed received from box backend");
      io.sockets.emit("box-closed-confirmed", { connection_confirmed: true });
      io.sockets.emit('refresh-box-state', data);
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
    }).catch(err => {
    // Error updating Box. It should be controlled in the future.
    });
	
	/*
	Scooter.update({userId: null}, {where: { BoxId: data.boxId, userId: getCleanUser.id }
	}).then(num => {
    if (num == 1) {
	  console.log("Scooter actualizado");
	  // Raro?
    } else {
      // Cannot update Box with id. Maybe Box was not found
    }
	}).catch(err => {
	  console.log("Something went wrong " + err.message)
	});
	*/
  
  return res.send({ response: "box-closed received" }).status(200);
});

/* Parking Sonia antiguo          -- PARKING, PULLING IN and OUT -- */
/*   
/////////////////app.post de charger plugged//////////////////////////////////////////////
Sonia part
app.post("/charger_plugged_in/:parking_id/:box_id/:charger_state", (req, res) => {
  console.log("charger_plugged_in in backend")
  const data = { boxId: parseInt(req.params.box_id) };
  Box.update({ state: PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED, occupied: true }, {
    where: { id: data.boxId }
  }).then(num => {
    if (num == 1) {
      // refresh information in mobile phones
	  io.sockets.emit('refresh-box-state', data);
	} else {
      // Cannot update Box with id. Maybe Box was not found
    }
	}).catch(err => {
    // Error updating Box. It should be controlled in the future.
   });
  return res.send({ response: "charger_plugged_in sent" }).status(200);
});


app.post("/box_closed/:parking_id/:box_id/:charger_state", (req, res) => {
    console.log("SCOOTER IS STILL PLUGGED IN")
  });

  return res.send({ response: "renting-charger-unplugged received" }).status(200);
});
*/ 
require("./routes/user.routes")(app);
require("./routes/parking.routes")(app);
require("./routes/box.routes")(app);
require("./routes/scooter.routes")(app);

//Using http
let server = null;
if(process.env.HTTPS == "false"){
  server = http.createServer(app);
}

//Using https
if(process.env.HTTPS == "true"){
  server = https.createServer(options, app);
}


const Box = db.box;
const Scooter = db.scooter;
// Parking pulling scooter in constants
const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 12;
const PARKING_MODE_INTRODUCING_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED = 13;
const PARKING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 14;
// Renting pulling scooter out constants
const RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 22;
const RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PULLED_OUT_CONFIRMATION_RECEIVED = 23;
const RENTING_MODE_PULLING_OUT_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 24;
// Renting pulling scooter in constants
const RENTING_MODE_INTRODUCING_SCOOTER_DOOR_OPEN_CONFIRMATION_RECEIVED = 26;
const RENTING_MODE_PULLING_OUT_SCOOTER_CHARGER_PLUGGED_IN_CONFIRMATION_RECEIVED = 27;
const RENTING_MODE_INTRODUCING_SCOOTER_DOOR_CLOSED_CONFIRMATION_RECEIVED = 28;


const io = socketIo(server, {
  cors: {
    // origin: process.env.BLUECITY_CLIENT,
    origin: '*',
    methods: ["GET", "POST"],
    credentials: true
  },
  transports: ['polling', 'websocket']
});


io.on("connect", (socket) => {
  console.log("New client connected");

  socket.emit("welcome", { connection_confirmed: true });
  
  
  /* Renting pulling scooter in     -- RENTING, PULLING IN -- */
  socket.on("open-box-renting-in", (data) => {
    console.log("open-box")
    console.log(data);

    let parking_url = "http://localhost:9000";

    axios.post(`${parking_url}/open_box/${data.id}`)
      .then(res => {
        console.log("open-box sent from backend to box backend");
        socket.emit("box-opened", { connection_confirmed: true });
    })
    .catch(error => {
      console.error(error)
    });
	
  socket.on("something-changed", (data) => {
    console.log("something changed: " + data.toString());
    // socket.emit("refresh", data);      // send to only the client who emited

    io.sockets.emit('refresh', data);     // send to all
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  
});

  /* Renting pulling scooter out     -- RENTING, PULLING OUT -- */
  socket.on("open-renting-box", (data) => {
    console.log("open-renting-box-ahorita-wey")
    console.log(data);

    let parking_url = "http://localhost:9000";

    axios.post(`${parking_url}/open_renting_box/${data.id}`)
    .then(res => {
        console.log("open-renting-box sent from backend to box backend");
    })
	.catch(error => {
		console.error(error)
    });
	
	socket.on("something-changed", (data) => {
    console.log("something changed: " + data.toString());
    // socket.emit("refresh", data);      // send to only the client who emited

    io.sockets.emit('refresh', data);     // send to all
    });
  
    socket.on("disconnect", () => {
		console.log("Client disconnected");
    });
});	
});	
	server.listen(port, () => {
		console.log('Server started on: ' + port);
	});
