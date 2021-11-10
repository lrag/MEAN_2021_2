//npm install validatorjs
const Validator = require("validatorjs")
const ObjectId = require("mongodb").ObjectId

let reglasUsrInsercion = {
    login    : "required|min:3|max:20",
    password : "required|min:3|max:20",
    nombre   : "required|min:3|max:50",
    correoE  : "required|min:3|max:30|email"
}

//No hace falta estar autenticado para llamar aqui
exports.altaUsuario = function(usuario){

    return new Promise(function(resolve, reject){
        
        Validator.useLang('es')
        let validador = new Validator(usuario, reglasUsrInsercion)
        if(validador.fails()){
            console.log(validador.errors.errors)
            reject( { codigo:400, 
                      mensaje:'Los datos del cliente son incorrectos', 
                      errores: validador.errors.errors } ) //Mal
            return
        }

        let coleccionUsuarios = process.esquema.collection("usuarios")
        
        coleccionUsuarios
            .findOne({ login : usuario.login})
            .then(function(usuarioEncontrado){
                if(usuarioEncontrado){
                    reject({ codigo:400, mensaje:"Ya existe un usuario con ese login" })
                    return
                }
                return coleccionUsuarios.insertOne( usuario )
            })
            .then(function(resultado){
                console.log("Usuario insertado")
                console.log(resultado)
                resolve(resultado.insertedId) //Todo fue bien :)
            })
            .catch(function(err){
                console.log(err)
                reject({ codigo:500, mensaje:"Error con la base de datos!!!" })
            })
    })

}

//
exports.modificarUsuario = function(){
    
}
//
exports.bajaUsuario = function(idUsuario){
    
    return new Promise(function(resolve,reject){

        let coleccionUsuarios = process.esquema.collection("usuarios")
        let coleccionUsuariosHistorico = process.esquema.collection("usuarios_historico")

        let usuarioEncontrado = null

        coleccionUsuarios
            .findOne({ _id : new ObjectId(idUsuario) })
            .then( usr => {
                usuarioEncontrado = usr
                if(!usuarioEncontrado){
                    reject({ codigo:404, mensaje:"El usuario no existe" })
                    return
                }
                return coleccionUsuarios.findOneAndDelete({ _id : new ObjectId(idUsuario) })
            })
            .then(resultadoDelete => {
                console.log("DELETE:", resultadoDelete)
                return coleccionUsuariosHistorico.insertOne(usuarioEncontrado)
            })
            .then( resultadoInsertOne => {                
                console.log("INSERT:", resultadoInsertOne)
                resolve()
            })
            .catch(error => {
                console.log(err)
                reject({ codigo:500, mensaje:"Error con la base de datos!!!" })
            })

    })

}









