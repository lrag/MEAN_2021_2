//npm install validatorjs
const Validator = require("validatorjs")
const ObjectId = require("mongodb").ObjectId

let reglasUsrInsercion = {
    login    : "required|min:3|max:20",
    password : "required|min:3|max:20",
    nombre   : "required|min:3|max:50",
    correoE  : "required|min:3|max:30|email"
}

let reglasUsrModificacion = {
    nombre    : "required|min:3|max:50",
    correoE   : "required|min:3|max:30|email",
    telefono  : "required|min:3|max:20",
    direccion : "required|min:3|max:50"
}

exports.buscarPorLoginYPw = function(login, password){

    return new Promise(function(resolve, reject){
        let coleccionUsuarios = process.esquema.collection("usuarios")
        coleccionUsuarios
            .findOne({ login:login, password:password }, { projection : { password : 0 }} )
            .then(usuarioEncontrado => {
                if(!usuarioEncontrado){
                    reject({ codigo:404, mensaje:"No existe un usuario con este login y password" })
                    return
                }
                //delete usuarioEncontrado.password
                resolve(usuarioEncontrado)
            })
            .catch(err => {
                console.log(err)
                reject({ codigo:500, mensaje:"Error con la base de datos!!!" })
            })    
    })

}

//Autenticación : ninguna
//Autorización  : ninguna
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
        
        //Le asigmanos el rol 'CLIENTE'
        usuario.rol = "CLIENTE"

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

//Autenticación: si
//Autorización :
//-empleados: pueden modificar cualquier usuario
//-clientes : solo pueden modificarse a si mismos
exports.modificarUsuario = function(usuario, autoridad){
    
    return new Promise(function(resolve, reject){

        //Validación
        Validator.useLang('es')
        let validador = new Validator(usuario, reglasUsrModificacion)
        if(validador.fails()){
            console.log(validador.errors.errors)
            reject( { codigo:400, 
                      mensaje:'Los datos del cliente son incorrectos', 
                      errores: validador.errors.errors } ) //Mal
            return
        }        
                    
        //Autorización 
        if(autoridad.rol=="CLIENTE" && autoridad._id!=usuario._id){                        
            reject( { codigo:403, 
                        mensaje:'Los clientes solo pueden modificarse a si mismos' } ) //Mal
            return
        }
    
        //Modificar 
        process.esquema.collection("usuarios").findOneAndUpdate( 
                { _id : new ObjectId(usuario._id) },
                {
                    $set : {
                        //Aqui no podemos colocar el _id (es inmutable)
                        nombre    : usuario.nombre,
                        correoE   : usuario.correoE,
                        telefono  : usuario.telefono,
                        direccion : usuario.direccion,
                        idioma    : usuario.idioma
                    }
                }
            ) 
        .then( resultado => {
            if(!resultado.value){
                reject({ codigo:404, mensaje:"El usuario no existe"})
                return
            }
            resolve()
        })
        .catch( error => {
            console.log(error)
            reject({ codigo:500, mensaje:"Error con la base de datos"})
        })

    })

}

//Autenticación: si
//Autorización :
//-empleados: si
//-clientes : solo pueden borrarse a si mismos
exports.bajaUsuario = function(idUsuario, autoridad){

    return new Promise(function(resolve,reject){

        console.log("Autoridad:", autoridad, "idUsuario:", idUsuario)

        if(autoridad.rol=="CLIENTE" && autoridad._id != idUsuario){
            reject({ codigo:403, mensaje:"Un cliente solo puede darse de baja a si mismo"})
            return
        }

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
                console.log(error)
                reject({ codigo:500, mensaje:"Error con la base de datos!!!" })
            })

    })

}









