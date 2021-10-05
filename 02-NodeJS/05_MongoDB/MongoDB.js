//npm install mongodb
const mongoDB = require("mongoDB")

/////////////////////
// MONGO DB CLIENT //
/////////////////////

//Funciones asíncronas:
//-connect

//Funciones síncronas:
//-

//////////////////////////////////
//Obtener una conexión a MongoDB//
//////////////////////////////////

console.log(mongoDB.connect)


//
//mongodb://<ip>:<puerto>[/esquema]
//
/*
const url = "mongodb://localhost:27017"

console.log("Conectando a mongoDB...")

mongoDB.connect(url, function(err, dbs){
    if(err){
        console.log("Error al conectar",err)
        return
    }
    console.log("Conexión establecida")
})

console.log("FIN")
*/



