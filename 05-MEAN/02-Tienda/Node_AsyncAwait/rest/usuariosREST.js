const express = require("express")
const negocioUsuarios = require("../modelo/negocio/negocioUsuarios")

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
async function altaUsuario(request, response){
    let usuario = request.body
    console.log("Alta Usuario (LC): ", usuario)

    try {
        let id = await negocioUsuarios.altaUsuario(usuario)
        response.statusCode = 201
        response.json({ codigo:201, mensaje:"Usuario insertado", id:id })
    } catch(error){
        //Este catch se ejecuta si:
        //-los datos son invalidos
        //-ya existe un usuario con ese login
        //-fallo catastrófico
        response.statusCode = error.codigo
        response.json(error)
    }
}

//PATCH /usuarios/:id
//CT: app/json
//Authorization: Bearer kjhjfvriehr4hfjrghur4.asrhjkdsfhjkwtryit4huiwgrwhjkjew.danjlkfsghjkewhjkghjkwt
//-------------------
//{ usuario }
async function modificarUsuario(request, response){

    let idUsuario = request.params.id
    let usuario   = request.body
    let autoridad = request.autoridad

    //PATCH /usuarios/42
    //CT: app/json
    //Authorization: Bearer kjhjfvriehr4hfjrghur4.{ _id:42, login:Sr.Smith, rol:CLIENTE }.danjlkfsghjkewhjkghjkwt
    //-------------------
    //{ 
    //  _id       : 52 <--OJO
    //  direccion : "Otra direccion"
    //}    
    if(usuario._id && usuario._id!=idUsuario){
        response.status(401).json({ codigo:401, mensaje:"De qué vas, imbécil"})
        return
    }
    //Y si en el json no viene el id le ponemos el que viene en la url
    usuario._id = idUsuario

    try {
        await negocioUsuarios.modificarUsuario(usuario, autoridad)
        response.json({ codigo:200, mensaje:"El usuario se modificó correctamente" })
    } catch(err) {
        console.log(err)
        response.status(err.codigo).json(err)
    } 
}

//DELETE /usuarios/:id
async function bajaUsuario(request, response){

    let id = request.params.id
    let autoridad = request.autoridad

    try{
        await negocioUsuarios.bajaUsuario(id, autoridad)
        response.json({ codigo:200, mensaje:"El usuario se ha dado de baja" })
    } catch(error) {
        response.statusCode = error.codigo
        response.json(error)
    }

}

