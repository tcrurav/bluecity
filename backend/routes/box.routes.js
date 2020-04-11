module.exports = app => {
    const boxes = require("../controllers/box.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Box
    router.post("/", boxes.create);
  
    // Retrieve all Box
    router.get("/", boxes.findAll);
  
    // Retrieve a single Box with id
    router.get("/:id", boxes.findOne);
  
    // Update a Box with id
    router.put("/:id", boxes.update);
  
    // Delete a Box with id
    router.delete("/:id", boxes.delete);
  
    // Create a new Box
    router.delete("/", boxes.deleteAll);
  
    app.use('/api/boxes', router);
  };