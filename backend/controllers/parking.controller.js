const db = require("../models");
const Parking = db.parking;
const Box = db.box;
const Op = db.Sequelize.Op;

// Create and Save a new Parking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.id) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Parking
    const parking = {
        id: req.body.id,
        lat: req.body.lat,
        long: req.body.long,
        address: req.body.address,
        name: req.body.name,
    };

    // Save Parking in the database
    Parking.create(parking)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Parking."
            });
        });
};

// Retrieve all Parkings from the database.
exports.findAll = (req, res) => {
    Parking.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving parkings."
            });
        });
};

function getUniqueParkingIdValues(array) {
    var flags = [], output = [], l = array.length, i;
    for (i = 0; i < l; i++) {
        if (flags[array[i].dataValues.parkingId]) continue;
        flags[array[i].dataValues.parkingId] = true;
        output.push(array[i].dataValues.parkingId);
    }
    return output;
}

// as its name explains, it executes the query asynchronously to get properly the desired data.
function executeQueryAsynchronously(data) {
    return new Promise(function (resolve, reject) {
        let uniqueParkingIdValues = getUniqueParkingIdValues(data)
        let output = uniqueParkingIdValues.map(b => {
            return Parking.findByPk(b).then(parkingData => {
                return parkingData.dataValues;
            })
        })
        // waits to return from the output when all the individual promises are solved.
        Promise.all(output).then(function (results) {
            resolve(results);
        })
    })
}

// Retrieve all Parkings from the database with a free scooter.
exports.findAllWithAFreeScooter = (req, res) => {
    Box.findAll({
        where: { userId: null, occupied: 1 }
    })
        .then(data => {
            executeQueryAsynchronously(data).then(resultParking => {
                res.send(resultParking);
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving boxes."
            });
        });
};

const FIVE_MINUTES = 5 * 60 * 1000;

// Retrieve all Parkings from the database with a free box.
exports.findAllWithAFreeBox = (req, res) => {
    Box.findAll({
        where: { occupied: 0, lastReservationDate: { [Op.lt]: new Date(new Date() - FIVE_MINUTES) } }
    })
        .then(data => {
            executeQueryAsynchronously(data).then(resultParking => {
                res.send(resultParking);
            })
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving boxes."
            });
        });
};

// Find a single Parking with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Parking.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Parking with id=" + id
            });
        });
};

// Update a Parking by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Parking.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parking was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Parking with id=${id}. Maybe Parking was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Parking with id=" + id
            });
        });
};

// Delete a Parking with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Parking.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Parking was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Parking with id=${id}. Maybe Parking was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Parking with id=" + id
            });
        });
};

// Delete all Parkings from the database.
exports.deleteAll = (req, res) => {
    Parking.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Parkings were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all tutorials."
            });
        });
};