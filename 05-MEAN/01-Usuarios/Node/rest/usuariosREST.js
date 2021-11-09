const express = require("express")

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
    console.log(usuario)


    
    
    response.end("Usuario insertado")
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




