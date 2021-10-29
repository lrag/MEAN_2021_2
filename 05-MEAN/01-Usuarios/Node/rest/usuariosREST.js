const express = require("express")

let router = express.Router()

router.post("/usuarios", altaUsuario)
router.patch("/usuarios/:id", modificarUsuario)
router.delete("/usuarios/:id", bajaUsuario)
router.get("/clientes", listarClientes)

exports.router = router

///////////////////////////////////////////
//Funciones de la lógica de control      //
///////////////////////////////////////////

function altaUsuario(request, response){
    response.end("Usuario insertado")
}

function modificarUsuario(request, response){
    response.end("Usuario modificado")
}

function bajaUsuario(request, response){
    response.end("Usuario borrado")
}




