const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');

const { User } = require('../models/user');

const router = express.Router();

let ExtractJWT = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};

jwtOptions.jwtFromRequest = ExtractJWT.fromAuthHeaderWithScheme("jwt");
jwtOptions.secretOrKey = "secretSquirrel";

let strategy = new JwtStrategy(
  jwtOptions,
  function (jwt_payload, next) {
    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (user) {
        next(null, user);
      }
      else {
        next(null, false);
      }
    });
  });

passport.use(strategy);
passport.use(User.createStrategy());

router.use(passport.initialize());

// register
router.post('/register', (req, res) => {
  if (
    req.body.username &&
    req.body.password
  ) {
    User.findOne({ username: req.body.username },
      (err, user) => {
        if (err) {
          res.status(401).json(err);
        } else if (!user) {
          let newUser = new User({
            username: req.body.username
          });
          User.register(
            newUser,
            req.body.password,
            (err) => {
              if (err) {
                res.status(401).json(err)
              } else {
                res.status(201).json({ message: "registration successful." });
              }
            });
        } else {
          res.status(401).json({ message: "already registered username." });
        }
      });
  } else {
    res.status(401).json({ message: "email and password required." });
  }
});

// login
router.post("/login", (req, res) => {
  if (req.body.username && req.body.password) {
    const username = req.body.username;
    const password = req.body.password;

    // authenticate
    User.findOne({ username: username },
      function (err, user) {
        if (err) {
          res.status(401).json(err);
        } else if (!user) {
          return res.status(401).json({
            message: "user not registered."
          });
        }
        user.authenticate(
          password,
          function (err, user) {
            if (err) {
              res.status(401).json(err)
            }
            if (user) {
              const payload = { id: user.id };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.status(200).json({
                message: "login successful.",
                token: token
              });
            } else {
              res.status(401).json({
                message: "invalid password."
              });
            }
          });
      });
  } else {
    res.status(401).json({
      message: "missing username or password."
    });
  }
});

module.exports = router;