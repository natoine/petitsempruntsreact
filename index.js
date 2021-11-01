"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

const mongodb = require('mongodb');
const urimongo = require("./resources/secret/databaseconfig.js").url;
console.log(urimongo);

app.get('/', function (req, res) {
  res.send('Bienvenue sur petits emprunts bientôt en react - on bosse sur la home pour le moment !');
});

app.post('/newlend', function (req, res){
  mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
    let dbcol = client.db("petitsemprunts").collection("lends");
    let myobj = {name: 'John', address: 'Highway 71'};
    dbcol.insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
  });
});

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});
