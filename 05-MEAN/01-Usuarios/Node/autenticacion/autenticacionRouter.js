const express = require("express")
const negocioUsuarios = require("../negocio/negocioUsuarios")

let router = express.Router()

//Esto no es REST y no pasa nada
router.post("/login", autenticarUsuario)

exports.router = router

//POST /login
//CT: app/json
//-------------------
//{ login:"", password:"" }
function autenticarUsuario(request, response){

    let credenciales = request.body

    negocioUsuarios
        .buscarPorLoginYPw(credenciales.login, credenciales.password)
        .then(usuario => {
            //Crear el token y devolverlo

            response.end("USUARIO ENCONTRADO")
        })
        .catch(err => {
            //-No existe el usuario
            //-Fallo catastrofico
            response.status(err.codigo).json(err)
        })

}



