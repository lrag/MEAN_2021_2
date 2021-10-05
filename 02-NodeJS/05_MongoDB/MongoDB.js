//npm install mongodb
const mongoDB = require("mongodb")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-mongoClient.connect

//Funciones síncronas:
//-dbs.db("nombre_esquema")
//-db.collection("nombre_coleccion")

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////


//
//mongodb://<ip>:<puerto>[/esquema]
//
const url = "mongodb://localhost:27017"


//Creamos el objeto 'MongoClient'
const client = new mongoDB.MongoClient(url)

//La función connect es asíncrona
//Nos dan un objeto que representa al servidor de bases de datos
console.log("Conectando a mongoDB...")
client.connect(function(err, dbs){
    if(err){
        console.log("Error al conectar",err)
        return
    }
    console.log("Conexión establecida")

    //Al objeto dbs le pedimos el esquema que necesitamos
    let esquemaDiscos = dbs.db("esquema_discos")

    //Al esquema le pedimos la colección que vamos a utilizar
    let coleccionDiscos = esquemaDiscos.collection("discos")

    //A la colección le pedimos que ejecute consultas

    /////////////
    //insertOne//
    /////////////

    let disco = {
        //_id : "TOCOTO",
        titulo : "Purpendicular",
        grupo  : "Deep Purple",
        year   : 1996,
        discografica : "BMG"
    }

    coleccionDiscos.insertOne(disco, function(err, result){
        if(err){
            console.log("Error al insertar",err)
            return
        }
        console.log("Result:", result)

        
    })

})

console.log("FIN en falso")




