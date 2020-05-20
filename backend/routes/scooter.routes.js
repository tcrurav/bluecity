module.exports = app => {
    const scooters = require("../controllers/scooter.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Scooter
    router.post("/", scooters.create);
  
    // Retrieve all Scooter
    router.get("/", scooters.findAll);

    // Find all free scooter
    router.get("/freeScooters", scooters.findFreeScooters);
  
    // Retrieve a single Scooter with id
    router.get("/:id", scooters.findOne);
  
    // Update a Scooter with id
    router.put("/:id", scooters.update);
  
    // Delete a Scooter with id
    router.delete("/:id", scooters.delete);
  
    // Create a new Scooter
    router.delete("/", scooters.deleteAll);
  
    app.use('/api/scooters', router);
  };