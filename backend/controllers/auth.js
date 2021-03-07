const jwt = require('jsonwebtoken');
const utils = require('../utils');

const db = require("../models");
const User = db.user;

exports.signin = (req, res) => {
  const user = req.body.username;
  const pwd = req.body.password;

  // return 400 status if username/password is not exist
  if (!user || !pwd) {
    return res.status(400).json({
      error: true,
      message: "Username or Password required."
    });
  }

  // return 401 status if the credential is not match.
  User.findOne({ where: { username: user, password: pwd } })
    .then(data => {
      // generate token
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      // return the token along with user details
      return res.json({ user: userObj, token });
    })
    .catch(err => {
      return res.status(500).send({
        message:
          err.message || "Some error occurred while authenticating."
      });
    });
};

exports.isAuthenticated = (req, res, next) => {
  // check header or url parameters or post parameters for token
  // var token = req.body.token || req.query.token;
  var token = req.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: "Token is required."
    });
  }
  // check token that was passed by decoding token using secret
  // .env should contain a line like JWT_SECRET=V3RY#1MP0RT@NT$3CR3T#
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    User.findByPk(user.id)
      .then(data => {
        //console.log(data)
        // return 401 status if the userId does not match.
        //if (!user.id) {
        if (!data.dataValues.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        // get basic user details
        return next();
      })
      .catch(err => {
        return res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  });
};