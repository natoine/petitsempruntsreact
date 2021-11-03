const mongodb = require('mongodb');
const urimongo = require("../resources/secret/databaseconfig.js").url;
//console.log(urimongo);

function getLends(callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        client.db("petitsemprunts").collection("lends").find().toArray(function (err, items) {
            callback(items);
        });
    });
}

function createLend(lend, callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        let dbcol = client.db("petitsemprunts").collection("lends");
        dbcol.insertOne(lend, function (err, res) {
            if (err) callback(err, null);
            else {
                callback(null, res.insertedId);
                client.close();
            }
        });
    });
}

module.exports = {
    getLends: getLends,
    createLend: createLend
}