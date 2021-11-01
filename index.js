"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

const mongodb = require('mongodb');

app.get('/', function (req, res) {
  res.send('Bienvenue sur petits emprunts bientôt en react - on bosse sur la home pour le moment !');
});

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});
