//npm install mongodb
const mongoDB = require("mongodb")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-mongoClient.connect
//-dbs.close
//-collection.insert
//-collection.insertOne
//-collection.findOne
//-cursor.toArray

//Funciones síncronas:
//-dbs.db("nombre_esquema")
//-db.collection("nombre_coleccion")
//-collection.find() 

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
        titulo : "Hotel California",
        grupo  : "Eagles",
        year   : 1976,
        discografica : "Elektra"
    }

    coleccionDiscos.insertOne(disco, function(err, result){
        if(err){
            console.log("Error al insertar",err)
            return
        }
        console.log("Result:", result)

        //coleccionDiscos.find({})
        let cursor = coleccionDiscos.find() //Esto es síncrono y devuelve un cursor
        //toArray (o cualquier otro modo de recorrer el cursor) es asóincrono
        cursor.toArray(function(err, discos){
            if(err){
                console.log("Error al insertar",err)
                return
            }  
            console.log("Discos:", discos)          
            dbs.close(function(err){
                if(err){
                    console.log("Fallo al desconectar", err)
                    return
                }
                console.log("Conexión cerrada")
            })
            console.log("Otro fin en falso")
        })        
    })
})

console.log("FIN en falso")


