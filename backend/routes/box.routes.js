module.exports = app => {
    const boxes = require("../controllers/box.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Box
    router.post("/", auth.isAuthenticated, boxes.create);
  
    // Retrieve all Box
    router.get("/", auth.isAuthenticated, boxes.findAll);
  
    // Retrieve a single Box with id
    router.get("/:id", auth.isAuthenticated, boxes.findOne);
  
    // Update a Box with id
    router.put("/:id", auth.isAuthenticated, boxes.update);
  
    // Delete a Box with id
    router.delete("/:id", auth.isAuthenticated, boxes.delete);
  
    // Create a new Box
    router.delete("/", auth.isAuthenticated, boxes.deleteAll);
  
    app.use('/api/boxes', router);
  };