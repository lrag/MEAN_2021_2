const mongoose = require("mongoose")

let esquemaUsuarioHistorico = new mongoose.Schema({
    //Aqui queremos ser nosotros los que den el valor al _id      
    //_id       : mongoose.ObjectId,
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
exports.UsuarioHistorico = mongoose.model('usuarios_historicos', esquemaUsuarioHistorico)
