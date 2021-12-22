//npm install jsonwebtoken
//Estamos utilizando esta librería como pudieramos estar usando cualquier otra
const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")

const express = require("express")
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

let router = express.Router()

//Esto no es REST y no pasa nada
router.post("/login", autenticarUsuario)

exports.router = router

//POST /login
//CT: app/json
//-------------------
//{ login:"", password:"" }
async function autenticarUsuario(request, response){

    let credenciales = request.body

    try {
        let usuario = await negocioUsuarios.buscarPorLoginYPw(credenciales.login, credenciales.password)
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

        //Colocando el jwt en la cabecera de la respuesta (hay aplicaciones que lo hacen)
        //response.setHeader('Authorization','Bearer '+token)
        //response.setHeader('Access-Control-Expose-Headers', 'Authorization')             

        //Lo más normal es entregar el token en el body de la respuesta
        //Nosotros, además, entregaremos los datos del usuario
        //Le retiramos el pw al usuario
        //delete usuario.password 
        let respuesta = {
            jwt : token,
            usuario : usuario //El usuario va sin el password
        }
        response.json(respuesta)
    } catch (error) {
        //-No existe el usuario
        //-Fallo catastrofico
        response.status(error.codigo).json(error)
    }

}



