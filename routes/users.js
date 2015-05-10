var express = require('express');
var router = express.Router();

var Models = require('../models');
var bcrypt = require('bcrypt');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function(req, res, next){
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  if (userToAdd.username == null || userToAdd.password == null) {
    res.status(400).json({ error: 'Ei voida lisätä tyhjää salasanaa tai käyttäjätunnusta.' });
  }

  Models.User.findOne({
    where: { username: userToAdd.username }
  }).then(function(user){
    if (user) {
      res.status(400).json({ error: 'Käyttäjätunnus on jo käytössä!' });
    } else {
      var unCyptedPassword = userToAdd.password;

      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(unCyptedPassword, salt, function(err, hash) {

          userToAdd.password = hash;

          Models.User.create(userToAdd).then(function(newUser) {
            res.json(newUser);
          });

        });
      });
    }
  });
  // Palauta vastauksena lisätty käyttäjä
});

// POST /users/authenticate
router.post('/authenticate', function(req, res, next){
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;

  if(userToCheck == null || userToCheck.username == null || userToCheck.password == null){
    res.send(403);
  }

  Models.User.findOne({
    where: {
      username: userToCheck.username
    }
  }).then(function(user){
    if(user){
      bcrypt.compare(userToCheck.password, user.password, function(err, result) {
        if (result) {
          req.session.userId = user.id;
          res.json(user)
        } else {
          res.sendStatus(403);
        }
      })
    }else{
      res.send(403);
    }
  });
});

// GET /users/logged-in
router.get('/logged-in', function(req, res, next){
  var loggedInId = req.session.userId ? req.session.userId : null;

  if(loggedInId == null){
    res.json({});
  }else{
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
    Models.User.findOne({
      where: {id: loggedInId}
    }).then(function(user){
      if (user) {
        res.json(user);
      } else {
        res.json({});
      }
    });
  }
});

// GET /users/logout
router.get('/logout', function(req, res, next){
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
