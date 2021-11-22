const mongoose = require("mongoose")

let esquemaUsuario = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id no lo añadiremos al esquema            
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

//Exportamos el modelo
exports.Usuario = mongoose.model('usuarios', esquemaUsuario)