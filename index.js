"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const dbservice = require('./services/DataBaseService');

app.use(express.json());//needed to parse request body in json

app.get('/', function (req, res) {
  res.send('Bienvenue sur petits emprunts bientôt en react - on bosse sur la home pour le moment !');
});

app.get('/lends', function (request, response) {
  dbservice.getLends(function (error, data) {
    if (error) {
      response.writeHead(error.code, {
        'Content-Length': Buffer.byteLength(error.message),
        'Content-Type': 'text/plain'
      }).end(error.message);
    }
    else {
      response.send(data);
    }
  });
});

app.post('/newlend', function (request, response) {
  const newlend = request.body;
  dbservice.createLend(newlend, function (error, newLendId) {
    if (error) {
      response.writeHead(error.code, {
        'Content-Length': Buffer.byteLength(error.message),
        'Content-Type': 'text/plain'
      }).end(error.message);
    }
    else {
      let resbody = "lend created with id : " + newLendId.toHexString();
      response.writeHead(201, {
        'Content-Length': Buffer.byteLength(resbody),
        'Content-Type': 'text/plain'
      }).end(resbody);
    }
  });
});

app.post('/newuser', function (request, response) {
  const newUser = request.body;
  dbservice.createUser(newUser, function (error, newUserId) {
    if (error) {
      response.writeHead(error.code, {
        'Content-Length': Buffer.byteLength(error.message),
        'Content-Type': 'text/plain'
      }).end(error.message);
    }
    else {
      let resbody = "user created with id : " + newUserId.toHexString();
      response.writeHead(201, {
        'Content-Length': Buffer.byteLength(resbody),
        'Content-Type': 'text/plain'
      }).end(resbody);
    }
  });
});

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});
