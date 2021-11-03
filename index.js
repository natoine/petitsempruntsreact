"use strict";

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 ;

const dbservice = require('./services/DataBaseService');

app.use(express.json());//needed to parse request body in json

app.get('/', function (req, res) {
  res.send('Bienvenue sur petits emprunts bientôt en react - on bosse sur la home pour le moment !');
});

app.get('/lends', function (req, res) {
  dbservice.getLends(function(data){res.send(data)});
});

app.post('/newlend', function (request, response){
  const newlend = request.body ;
  mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
    let dbcol = client.db("petitsemprunts").collection("lends");
    dbcol.insertOne(newlend, function(err, res) {
      if (err) {
        response.writeHead(500, {
          'Content-Length': Buffer.byteLength(err),
          'Content-Type': 'text/plain'
        }).end(err);
      }
      const id = res.insertedId ;
      client.close();
      let resbody = "lend created with id : " + id.toHexString() ;
      response.writeHead(201, {
        'Content-Length': Buffer.byteLength(resbody),
        'Content-Type': 'text/plain'
      }).end(resbody);
    });
  });
});

app.listen(PORT, function () {
  console.log('Petits emprunts lancé sur le port :' + PORT);
});
