const db = require("../models");
const Box = db.box;
const Op = db.Sequelize.Op;

// Create and Save a new Box
exports.create = (req, res) => {
  // Validate request
  if (!req.body.id) {
    return res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  // Create a Box
  const box = {
    id: req.body.id,
    state: req.body.state,
    enabled: req.body.enabled,
    occupied: req.body.occupied,
    lastReservationDate: req.body.lastReservationDate,
    userId: req.body.userId,
    ParkingId: req.body.ParkingId,
  };

  // Save Box in the database
  Box.create(box)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while creating the Box.",
      });
    });
};

// Retrieve all Boxes from the database.
exports.findAllBoxesInAParking = (req, res) => {
  const id = req.params.id;
  Box.findAll({
    where: { parkingId: id },
    order: [["id"]],
  })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving boxes.",
      });
    });
};

// Retrieve all Boxes from the database.
exports.findAll = (req, res) => {
  Box.findAll()
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: err.message || "Some error occurred while retrieving boxes.",
      });
    });
};

// Find a single Box with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Box.findByPk(id)
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Box with id=" + id,
      });
    });
};

// Find a single Box with an userId
exports.findOneWithUserId = (req, res) => {
  const userId = req.params.userId;

  Box.findOne({
    where: { userId: userId },
  })
    .then((data) => {
      return res.send(data);
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Error retrieving Box with userId=" + userId,
      });
    });
};

// Update a Box by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Box.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Box was updated successfully.",
        });
      } else {
        return res.send({
          message: `Cannot update Box with id=${id}. Maybe Box was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Error updating Box with id=" + id,
      });
    });
};

// reset all boxes in a parking
exports.resetAllBoxesInAParking = (req, res) => {
  const id = req.params.id;

  const BEGIN_OF_TIMES = new Date('1970-01-01 00:00:00');

  Box.update({ state: 0, occupied: false, lastReservationDate: BEGIN_OF_TIMES, userId: null }, {
    where: { parkingId: id },
  })
    .then((num) => {
      if (num >= 1) {
        return res.send({
          message: `${num} boxes where reseted in parking ${id}`,
        });
      } else {
        return res.send({
          message: `Cannot update any Box with parkingId=${id}. Maybe Parking was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send({
        message: "Error updating Boxes in parking with id=" + id,
      });
    });
};

// Delete a Box with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Box.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        return res.send({
          message: "Box was deleted successfully!",
        });
      } else {
        return res.send({
          message: `Cannot delete Box with id=${id}. Maybe Box was not found!`,
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        message: "Could not delete Box with id=" + id,
      });
    });
};

// Delete all Boxes from the database.
exports.deleteAll = (req, res) => {
  Box.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      return res.send({ message: `${nums} Boxes were deleted successfully!` });
    })
    .catch((err) => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials.",
      });
    });
};
