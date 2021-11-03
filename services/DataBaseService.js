const mongodb = require('mongodb');
const urimongo = require("../resources/secret/databaseconfig.js").url;
//console.log(urimongo);

function getLends(callback)
{
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        client.db("petitsemprunts").collection("lends").find().toArray(function(err, items) {
          callback(items);
        });
      });
}

module.exports = {
    getLends: getLends
}