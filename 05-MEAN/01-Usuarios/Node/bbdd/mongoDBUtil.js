const mongodb = require("mongodb")

exports.conectarBBDD = function(){

    console.log("Conectando con la base de datos...")
    console.log("IP    :"+process.env.bbdd_ip)
    console.log("Puerto:"+process.env.bbdd_puerto)

    const url = `mongodb://${process.env.bbdd_ip}:${process.env.bbdd_puerto}`

    const client = new mongodb.MongoClient(url)
    
}