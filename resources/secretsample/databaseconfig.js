const dbuser = process.env.userdb || "yourusername" ;
const dbpass = process.env.pwddb || "yourpwd";
const dbpath = process.env.dbpath || "yourdbpath" ; //<cluster>.<provider>/<dbname> exemple : cluster.by3ds.mongodb.net/mabasededonnées

module.exports = {
    'url' : `mongodb+srv://${dbuser}:${encodeURIComponent(dbpass)}@${dbpath}?retryWrites=true&w=majority` 
}