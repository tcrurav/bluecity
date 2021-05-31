module.exports = app => {
    const boxes = require("../controllers/box.controller.js");
    const auth = require("../controllers/auth.js");
  
    var router = require("express").Router();
  
    // Create a new Box
    router.post("/", auth.isAuthenticated, boxes.create);

    // Retrieve all Boxes in a parking
    router.get("/parking/:id", auth.isAuthenticated, boxes.findAllBoxesInAParking);
  
    // Retrieve all Boxes
    router.get("/", auth.isAuthenticated, boxes.findAll);
  
    // Retrieve a single Box with id
    router.get("/:id", auth.isAuthenticated, boxes.findOne);

    // Retrieve a single Box with userId
    router.get("/user/:userId", auth.isAuthenticated, boxes.findOneWithUserId);
  
    // Update a Box with id
    router.put("/:id", auth.isAuthenticated, boxes.update);

    // reset all boxes in a parking
    router.put("/reset/:id", auth.isAuthenticated, boxes.resetAllBoxesInAParking);
  
    // Delete a Box with id
    router.delete("/:id", auth.isAuthenticated, boxes.delete);
  
    // Create a new Box
    router.delete("/", auth.isAuthenticated, boxes.deleteAll);
  
    app.use('/api/boxes', router);
  };