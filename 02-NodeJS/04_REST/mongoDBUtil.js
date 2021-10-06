const mongodb = require("mongodb")

//'exports' es un objeto implícito que de entrada no tiene propiedades
//Le vamos añadiendo lo que queremos exportar como valores de propiedades

exports.esquema = null

exports.conectarBBDD = function(){

    let url = "mongodb://localhost:27017"
    let client = new mongodb.MongoClient(url)
    client.connect()
        .then( function(dbs){
            exports.esquema = dbs.db("esquema_discos")
        })
        .catch(function(err){
            console.log("Error al conectar con la base de datos", err)
        })

}
