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
  io.sockets.emit('simulator-open-box-renting-in', data);

  return res.send({ response: "open-box sent" }).status(200);
});
app.post("/open_renting_box/:box_id", (req, res) => {
  console.log("/open_renting_box in box backend");
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

//Sin terminar
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

	socket.on("welcome", (data) =>{
		console.log("welcome received from simulator backend")
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
	
	socket.on("simulator-charger-connected", (data) => {
		console.log("La orden ha sido recibida, simulator-charger-connected")
		axios.post(`${process.env.BACKEND_URL}/charger_connected/${data.parkingId}/${data.boxId}`)
		.then(res => {
			console.log("charger_connected sent")
		})
		.catch(error => {
			console.error("Ha petado amigo mío" + error.message)
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
			console.error("Ha petado lo de siempre" + error.message)
		});
	});
  
	socket.on("simulator-renting-scooter-charger-unplugged", (data) => {
		console.log("simulator-scooter-charger-unplugged")
		axios.post(`${process.env.BACKEND_URL}/renting_charger_unplugged/${data.parkingId}/${data.boxId}/${data.chargerState}`)
		.then(res => {
			console.log("charger_unplugged sent")
		})
		.catch(error => {
			console.error("El charger unplugged ha petado " + error.message)
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

	
	/* Parking pulling scooter in */
	socket.on("simulator-open-box-parking-in-confirmed", (data) => {
		console.log("simulator-open-box-parking-in-confirmed")
		axios.post(`${process.env.BACKEND_URL}/open_box_parking_in_confirmed/${data.parkingId}/${data.boxId}`)
		.then(res => {
			console.log("open_box_parking_in sent")
		})
		.catch(error => {
			console.error("Open parking in box ha petado " + error.message)
		});
	});
	
	socket.on("simulator-charger-connected-parking-in", (data) => {
		console.log("simulator-charger-connected-parking-in-confirmed")
		axios.post(`${process.env.BACKEND_URL}/charger_connected_parking_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
		.then(res => {
			console.log("charger_connected_parking_in sent")
		})
		.catch(error => {
			console.error("Charger connected parking in box ha petado " + error.message)
		});
	});

	socket.on("simulator-box-closed-parking-in", (data) => {
		console.log("simulator-box-closed-parking-in-confirmed")
		axios.post(`${process.env.BACKEND_URL}/box_closed_parking_in/${data.parkingId}/${data.boxId}/${data.chargerState}`)
		.then(res => {
			console.log("box_closed_parking_in sent")
		})
		.catch(error => {
			console.error("Close parking in box ha petado " + error.message)
		});
	});

	
  /* Parking pulling scooter out -- ¿Esto está bien?*/
  
	socket.on("simulator-open-box-parking-out-confirmed", (data) => {
		console.log("simulator-open-box-parking-out-confirmed")
		axios.post(`${process.env.BACKEND_URL}/open_box_parking_out_confirmed/${data.parkingId}/${data.boxId}`)
		.then(res => {
			console.log("open_box_parking_out sent")
		})
		.catch(error => {
			console.error("Open parking out box ha petado " + error.message)
		});
	});
	
	socket.on("simulator-charger-unplugged-parking-out", (data) => {
		console.log("simulator-charger-unplugged-parking-out-confirmed")
		axios.post(`${process.env.BACKEND_URL}/charger_unplugged_parking_out/${data.parkingId}/${data.boxId}/${data.chargerState}`)
		.then(res => {
			console.log("charger_unplugged_parking_out sent")
		})
		.catch(error => {
			console.error("Close parking out box ha petado " + error.message)
		});
	});

	socket.on("simulator-box-closed-parking-out", (data) => {
		console.log("simulator-box-closed-parking-out-confirmed")
		axios.post(`${process.env.BACKEND_URL}/box_closed_parking_out/${data.parkingId}/${data.boxId}/${data.chargerState}`)
		.then(res => {
			console.log("box_closed_parking_out sent")
		})
		.catch(error => {
			console.error("Close parking out box ha petado " + error.message)
		});
	});

	socket.on("disconnect", () => {
		console.log("simulator_frontend disconnected");
	});
});

server.listen(port, () => {
  console.log('Server started on: ' + port);
});
