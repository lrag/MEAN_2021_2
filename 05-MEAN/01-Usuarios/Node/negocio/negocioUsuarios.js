
//No hace falta estar autenticado para llamar aqui
exports.altaUsuario = function(usuario){

    return new Promise(function(resolve, reject){
        //-validar los datos del usuario
        //reject({ codigo:400, mensaje:"Datos incorrectos" })
        //return
        //-comprobar que el login no esté repetido
        //-insertar el usuario en la colección 'usuarios'

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
exports.bajaUsuario = function(){
    
}





























