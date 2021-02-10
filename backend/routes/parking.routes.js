module.exports = app => {
    const parkings = require("../controllers/parking.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Parking
    router.post("/", auth.isAuthenticated, parkings.create);
  
    // Retrieve all Parking
    router.get("/", auth.isAuthenticated, parkings.findAll);

    // Retrieve all Parking with a free scooter
    router.get("/freeParkings", auth.isAuthenticated, parkings.findAllWithAFreeScooter);

    // Retrieve all Parking with a free scooter
    router.get("/freeBoxes", parkings.findAllWithAFreeBox);

    // Retrieve a single Parking with id
    router.get("/:id", auth.isAuthenticated, parkings.findOne);
  
    // Update a Parking with id
    router.put("/:id", auth.isAuthenticated, parkings.update);
  
    // Delete a Parking with id
    router.delete("/:id", auth.isAuthenticated, parkings.delete);
  
    // Create a new Parking
    router.delete("/", auth.isAuthenticated, parkings.deleteAll);
  
    app.use('/api/parkings', router);
  };