const jwt = require('jsonwebtoken');
const utils = require('../utils');

const db = require("../models");
const User = db.users;


// // request handlers
// app.get('/', (req, res) => {
//   if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
//   res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
// });


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
      console.log(data);
      const token = utils.generateToken(data);
      // get basic user details
      const userObj = utils.getCleanUser(data);
      // return the token along with user details
      return res.json({ user: userObj, token });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// // validate the user credentials
// app.post('/users/signin', function (req, res) {
//   const user = req.body.username;
//   const pwd = req.body.password;

//   // return 400 status if username/password is not exist
//   if (!user || !pwd) {
//     return res.status(400).json({
//       error: true,
//       message: "Username or Password required."
//     });
//   }

//   // return 401 status if the credential is not match.
//   if (user !== userData.username || pwd !== userData.password) {
//     return res.status(401).json({
//       error: true,
//       message: "Username or Password is Wrong."
//     });
//   }

//   // generate token
//   const token = utils.generateToken(userData);
//   // get basic user details
//   const userObj = utils.getCleanUser(userData);
//   // return the token along with user details
//   return res.json({ user: userObj, token });
// });

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
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: "Invalid token."
    });

    User.findByPk(user.id)
      .then(data => {
        // return 401 status if the userId does not match.
        if (!user.id) {
          return res.status(401).json({
            error: true,
            message: "Invalid user."
          });
        }
        // get basic user details
        next();
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + id
        });
      });
  });
};

// // verify the token and return it if it's valid
// app.get('/verifyToken', function (req, res) {
//   // check header or url parameters or post parameters for token
//   var token = req.body.token || req.query.token;
//   if (!token) {
//     return res.status(400).json({
//       error: true,
//       message: "Token is required."
//     });
//   }
//   // check token that was passed by decoding token using secret
//   jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//     if (err) return res.status(401).json({
//       error: true,
//       message: "Invalid token."
//     });

//     // return 401 status if the userId does not match.
//     if (user.userId !== userData.userId) {
//       return res.status(401).json({
//         error: true,
//         message: "Invalid user."
//       });
//     }
//     // get basic user details
//     var userObj = utils.getCleanUser(userData);
//     return res.json({ user: userObj, token });
//   });
// });