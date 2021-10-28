const conf = require("../util/configUtil").conf
const mongodb = require("mongodb")

exports.conectarBBDD = function(){

    console.log("Conectando con la base de datos...")
    console.log("IP    :"+conf.bbdd_ip)
    console.log("Puerto:"+conf.bbdd_puerto)

    //const client = new mongodb.MongoClient()
    

}