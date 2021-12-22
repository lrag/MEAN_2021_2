//npm install validatorjs
const validacionUtil = require("../../util/validacionUtil")
const Usuario = require("../entidades/esquemaUsuario").Usuario
const UsuarioHistorico = require("../entidades/esquemaUsuarioHistorico").UsuarioHistorico

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

exports.buscarPorLoginYPw = async function(login, password){    
    try {
        //Con mongoose utilizamos el modelo para buscar
        let usuarioEncontrado = await Usuario.findOne({ login:login, password:password }, '-password -__v' )
        if(!usuarioEncontrado){
            throw { codigo:404, mensaje:"No existe un usuario con este login y password" }
        }        
        console.log(usuarioEncontrado)
        return usuarioEncontrado
    } catch (error) {
        throw { codigo:500, mensaje:"Error con la base de datos!!!" }
    }   
}

//Autenticación : ninguna
//Autorización  : ninguna
exports.altaUsuario = async function(usuario){

    try{
        let errores = validacionUtil.validar(usuario, reglasUsrInsercion)
        if(errores){
            throw { codigo:400, mensaje:"Datos invalidos", errores:errores }
        }

        //Le asignanos el rol 'CLIENTE'
        usuario.rol = "CLIENTE"

        let usuarioEncontrado = await Usuario.findOne({ login : usuario.login})        
        if(usuarioEncontrado){
            throw { codigo:400, mensaje:"Ya existe un usuario con ese login" }
        }  
        let usuarioMG = new Usuario(usuario)
        let usuarioInsertado = await usuarioMG.save()         
        console.log("Usuario insertado")
        console.log(usuarioInsertado)
        return usuarioInsertado._id
    } catch (error) {
        throw { codigo:500, mensaje:"Error con la base de datos!!!" }
    }
}

//Autenticación: si
//Autorización :
//-empleados: pueden modificar cualquier usuario
//-clientes : solo pueden modificarse a si mismos
exports.modificarUsuario = async function(usuario, autoridad){
    try{
        //Validación
        let errores = validacionUtil.validar(usuario, reglasUsrModificacion)
        if(errores){
            throw { codigo:400, mensaje:"Datos invalidos", errores:errores }
        }        
                    
        //Autorización 
        if(autoridad.rol=="CLIENTE" && autoridad._id!=usuario._id){                        
            throw { codigo:403, mensaje:'Los clientes solo pueden modificarse a si mismos' } //Mal, tendriamos que tomar medidas contra este usuario
        }
    
        //Modificar
        let usuarioModificado = await Usuario.findByIdAndUpdate(usuario._id, usuario)
        if(!usuarioModificado){
            throw { codigo:404, mensaje:"El usuario no existe"}
        }   
        return  
    } catch (error) {
        throw { codigo:500, mensaje:"Error con la base de datos!!!" }
    }        
}

//Autenticación: si
//Autorización :
//-empleados: si
//-clientes : solo pueden borrarse a si mismos
exports.bajaUsuario = async function(idUsuario, autoridad){

    try {
        console.log("Autoridad:", autoridad, "idUsuario:", idUsuario)

        //Autorización
        if(autoridad.rol=="CLIENTE" && autoridad._id != idUsuario){
            throw { codigo:403, mensaje:"Un cliente solo puede darse de baja a si mismo"}
        }

        let usuarioEncontrado = await Usuario.findById(idUsuario) 
        if(!usuarioEncontrado){
            throw { codigo:404, mensaje:"El usuario no existe" }
        }
        let resultadoDelete = await usuarioEncontrado.remove()
        console.log("DELETE:", resultadoDelete)
        /*Grán fajador
        let datos = {
            _id       : usuarioEncontrado._id,
            login     : usuarioEncontrado.login,
            password  : usuarioEncontrado.password,
            rol       : usuarioEncontrado.rol,
            nombre    : usuarioEncontrado.nombre,
            direccion : usuarioEncontrado.direccion,
            telefono  : usuarioEncontrado.telefono,
            correoE   : usuarioEncontrado.correoE,
            idioma    : usuarioEncontrado.idioma                    
        }  
        let usuarioHistorico = new UsuarioHistorico(datos)
        */                           
        
        //Fino estilista
        //Datos ya no es un objeto mongoose, ya no tiene las funciones, solo tiene las propiedades que guardan los datos
        let datos = usuarioEncontrado.toObject()
        let usuarioHistorico = new UsuarioHistorico(datos)
        let usuarioHistoricoInsertado = await usuarioHistorico.save()
        console.log("INSERT:", usuarioHistoricoInsertado)
        return
    } catch (error) {
        throw { codigo:500, mensaje:"Error con la base de datos!!!" }
    }  

}









