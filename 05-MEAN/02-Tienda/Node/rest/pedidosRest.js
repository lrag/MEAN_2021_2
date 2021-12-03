const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.get("/pedidos", listar)
router.get("/pedidos/:id", buscarPorId)
router.post("/pedidos", insertarPedido)
router.patch("/pedido/:id", modificarPedido)
router.delete("/pedido/:id", borrarPedido)

router.post("/ordenesCompra", comprar)

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
//  -movidas gordísimas en el body
//
//-invocar la función con la lógica de negocio
//
//-configurar la respuesta
//
//-Y YA

function listar(request, response){
    response.end("LISTARRRRRRRR...")
}

function buscarPorId(request, response){
    response.end("BUSCARRRRRR...(por id)")
}

function insertarPedido(request, response){
    response.end("INSERTARRRRRRRRRR...")
}

function modificarPedido(request, response){
    response.end("MODIFICARRRRRRRRRRRRR...")
}

function borrarPedido(request, response){
    response.end("BORRARRRRRRRRR...")
}

//POST /ordenesCompra
//CT:App/sjon
//-------------------
//{ pedido }
function comprar(request, response){

    let pedido = request.body
    negocioPedidos
        .comprar(pedido, request.autoridad)
        .then( () => {
            response.end("COMPRA EFECTUADA")
        })
        .catch(function(error){
            response.statusCode = error.codigo
            response.json(error)
        })
}

