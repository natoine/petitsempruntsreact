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

function createUser(user, callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }, function (err, client) {
        let dbcol = client.db("petitsemprunts").collection("users");
        //already one user with that username
        dbcol.findOne({ "username": user.username }).then(function (data, error) {
            if(error) callback(error, null);
            if (data) {
                const error = new Error("username already in use");
                error.code = 406;
                callback(error, null);
                client.close();
            }
            else 
            {
                //already one user with that email
                dbcol.findOne({ "usermail": user.usermail }).then(function (data, error) {
                    if(error) callback(error, null);
                    if (data) {
                        const error = new Error("mail already in use");
                        error.code = 406;
                        callback(error, null);
                        client.close();
                    }
                    else
                    {
                        //ok can create user
                        dbcol.insertOne(user, function (err, res) {
                            if (err) callback(err, null);
                            else 
                            {
                                callback(null, res.insertedId);
                                client.close();
                            }
                        });
                    }
                });
            }
        });
    });
}

module.exports = {
    getLends: getLends,
    createLend: createLend,
    createUser: createUser
}