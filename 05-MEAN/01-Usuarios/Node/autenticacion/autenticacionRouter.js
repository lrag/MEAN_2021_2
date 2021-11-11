//npm install jsonwebtoken
//Estamos utilizando esta librería como pudieramos estar usando cualquier otra
const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")

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
            //Creamos el token
            let token = jwt.sign(
                { 
                    _id    : usuario._id, 
                    login  : usuario.login, 
                    rol    : usuario.rol,
                    movida : "ABCDEF"
                }, 
                JWTUtil.getClave(), 
                { 
                    algorithm: 'HS512' //SHA512 con firma de clave simétrica
                }
            ) 
            //Lo adjuntamos a la respuesta
            console.log(token)

            response.end("USUARIO ENCONTRADO")
        })
        .catch(err => {
            //-No existe el usuario
            //-Fallo catastrofico
            response.status(err.codigo).json(err)
        })

}



