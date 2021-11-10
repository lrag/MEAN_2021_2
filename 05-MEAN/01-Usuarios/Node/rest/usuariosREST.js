const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

router.post("/usuarios", altaUsuario)
router.patch("/usuarios/:id", modificarUsuario)
router.delete("/usuarios/:id", bajaUsuario)

exports.router = router

///////////////////////////////////////////
//Funciones de la lógica de control      //
///////////////////////////////////////////
//
//Reciben el request y el response
//Su tarea consiste en:
//-extraer del request la información necesaria
//  -query parameters (?)
//  -valores incluidos en la ruta (:)
//  -valores presentes en los headers
//  -movidas en el body
//
//-invocar la función con la lógica de negocio
//
//-configurar la respuesta
//
//-Y YA

//POST /usuarios
//CT: app/json
//--------------
//{ usuario }
function altaUsuario(request, response){
    
    let usuario = request.body
    console.log("Alta Usuario (LC): ", usuario)

    negocioUsuarios
        .altaUsuario(usuario)
        .then(function(id){
            //Si estamos aqui es que se ha registrado el usuario
            response.end("USUARIO INSERTADO:"+id)
        })
        .catch(function(error){
            //Si estamos aqui es que no se ha registrado el usuario
            //-por que los datos eran inválidos
            //-por que el login estaba repetido
            //-por que hayan fallado las consultas
            response.statusCode = error.codigo
            response.json(error)
        })
    
    
}



















//PATCH /usuarios/:id
//CT: app/json
//-------------------
//{ usuario }
function modificarUsuario(request, response){
    response.end("Usuario modificado")
}

//DELETE /usuarios/:id
function bajaUsuario(request, response){
    response.end("Usuario borrado")
}
