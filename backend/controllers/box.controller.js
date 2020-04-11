const db = require("../models");
const Box = db.boxes;
const Op = db.Sequelize.Op;

// Create and Save a new Box
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Box
  const box = {
    id: req.body.id,
    occupied: req.body.occupied,
    userId: req.body.userId,
    ParkingId: req.body.ParkingId
  };

  // Save Box in the database
  Box.create(box)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Box."
      });
    });
};

// Retrieve all Boxes from the database.
exports.findAll = (req, res) => {
  Box.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boxes."
      });
    });
};

// Find a single Box with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Box.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Box with id=" + id
      });
    });
};

// Update a Box by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Box.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Box was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Box with id=${id}. Maybe Box was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Box with id=" + id
      });
    });
};

// Delete a Box with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Box.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Box was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Box with id=${id}. Maybe Box was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Box with id=" + id
      });
    });
};

// Delete all Boxes from the database.
exports.deleteAll = (req, res) => {
  Box.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Boxes were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};