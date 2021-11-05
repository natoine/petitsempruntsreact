const mongodb = require('mongodb');
const urimongo = require("../resources/secret/databaseconfig.js").url;
//console.log(urimongo);

function getLends(callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }).then(client => {
        client.db("petitsemprunts").collection("lends").find().toArray().then(items => {
            callback(null, items);
            client.close();
        });
    }).catch(function(err){
        const error = new Error("unable to connect DB");
        error.code = 500 ;
        callback(error, null);});
}

function createLend(lend, callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }).then(client => {
        client.db("petitsemprunts").collection("lends").insertOne(lend).then(function(data){
            callback(null, data.insertedId);
            client.close();
        });
    }).catch(function(err){
        const error = new Error("unable to connect DB");
        error.code = 500 ;
        callback(error, null);});
}

function createUser(user, callback) {
    mongodb.MongoClient.connect(urimongo, { useUnifiedTopology: true }).then(client => {
        console.log("test username");
        client.db("petitsemprunts").collection("users").findOne({ "username": user.username }).then(function(data){
            if(data)
            {
                const error = new Error("username already in use");
                error.code = 406;
                callback(error, null);
                client.close();
            }
            else 
            {
                console.log("test usermail");
                client.db("petitsemprunts").collection("users").findOne({ "usermail": user.usermail }).then(function(data){
                    if(data) 
                    {
                        const error = new Error("mail already in use");
                        error.code = 406;
                        callback(error, null);
                        client.close();
                    }
                    else
                    {
                        console.log("creates user");
                        client.db("petitsemprunts").collection("users").insertOne(user).then(function(data){
                            callback(null, data.insertedId);
                            client.close();
                        });
                    }
                });
            }
        });
    }).catch(error => {
        if(error.code) callback(error, null);
        else 
        {
            const err = new Error("unable to connect DB");
            error.code = 500 ;
            callback(error, null);
        }
    });
}

module.exports = {
    getLends: getLends,
    createLend: createLend,
    createUser: createUser
}