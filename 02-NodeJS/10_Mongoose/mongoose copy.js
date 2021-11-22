//npm install mongoose
let mongoose = require("mongoose")

let urlBBDD = "mongodb://localhost:27017/mongoose"

//Delegamos en mongoose el establecimiento de la conexión con el servidor de BB.DD.

console.log("Conectando con la base de datos")
mongoose
    .connect(urlBBDD)
    //.then( () => {
    //   pruebasMongoose() 
    //})
    .then(pruebasMongoose)
    .catch( err => console.log(err))

function pruebasMongoose(){

    let esquemaUsuario = new mongoose.Schema({
        //Si queremos que sea el driver el que le de valor al _id
        //no lo añadiremos al esquema            
        //_id       : ObjectID,
        login: {
            type    : String,
            required: true
        },
        password  : String,
        rol       : String,
        nombre    : String,
        direccion : String,
        telefono  : String,
        correoE   : String,
        idioma    : String        
    })

    let Usuario = mongoose.model('usuarios', esquemaUsuario)


    let usuario1 = new Usuario({ nombre:"Usuario1" });
    console.log(usuario1)
    usuario1.save() //INSERT

    let usuario2 = new Usuario({ _id : "00000000000000000000ABCD", nombre:"Usuario2" });
    console.log(usuario2)
    usuario2.save() //UPDATE
    
}