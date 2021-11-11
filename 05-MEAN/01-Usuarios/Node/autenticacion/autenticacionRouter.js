const express = require("express")

let router = express.router()

//Esto no es REST y no pasa nada
router.post("/login", autenticarUsuario)

exports.router = router

//POST /login
//CT: app/json
//-------------------
//{ login:"", pw:"" }
function autenticarUsuario(request, response){

    let credenciales = request.body

    

}



