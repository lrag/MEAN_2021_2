//npm install mongodb
let mongodb = require("mongodb")

const url = "mongodb://localhost:27017"
const client = new mongodb.MongoClient(url)

//1-Conectar
//2-Insertar un disco
//3-Listar los discos
//4-Desconectar

let coleccionDiscos = null //Como se nota que venimos del Java
let dbs = null

console.log("Estableciendo la conexión con mongoDB...")
client
    .connect()
    .then(function(_dbs){
        console.log("Conexión establecida")

        //Qué le vamos a hacer...
        dbs = _dbs

        let esquemaDiscos = dbs.db("esquema_discos")

        //¿que pasa si nos equivocamos al escribir el nombre del esquema o la coleccion?
        coleccionDiscos = esquemaDiscos.collection("discos")

        let disco = {
            //_id : "TOCOTO",
            titulo : "The number of the beast",
            grupo  : "Iron Maiden",
            year   : 1982,
            discografica : "EMI"
        }

        console.log("Insertando disco...")
        return coleccionDiscos.insertOne(disco) 
    })
    .then(function(resultadoInserccion){
        console.log("Disco insertado")
        console.log(resultadoInserccion)

        console.log("Listando los discos...")
        let cursor = coleccionDiscos.find()
        return cursor.toArray()
    })
    .then(function(discos){
        console.log("Discos:", discos)

        console.log("Desconectando...")
        return dbs.close()
    })  
    .then(function(){
        console.log("Desconectado")
        console.log("FIN")
    })  
    .catch(function(err){
        console.log(err)
    })

console.log("Fin en falso")
