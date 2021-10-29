const { Console } = require("console")
const mongodb = require("mongodb")

exports.conectarBBDD = function(){

    return new Promise(function(resolve, reject){
        console.log("Conectando con la base de datos...")
        console.log("IP    :"+process.env.bbdd_ip)
        console.log("Puerto:"+process.env.bbdd_puerto)

        const url = `mongodb://${process.env.bbdd_ip}:${process.env.bbdd_puerto}`
        const client = new mongodb.MongoClient(url)

        client
            .connect()
            .then( function(dbs){
                console.log("Conexión establecida")
                let esquema = dbs.db("tienda")
                //
                resolve()
            })
            .catch( function(err){
                console.log("Error al establecer la conexión.", err.message)
                reject()
            })
    })

}