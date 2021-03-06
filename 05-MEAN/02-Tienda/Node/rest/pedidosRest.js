const express = require("express")
const negocioPedidos = require("../modelo/negocio/negocioPedidos")

let router = express.Router()

router.get("/clientes/:idCliente/pedidos", listarPedidosPorCliente)
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
            response
                .status(201)
                .json({ codigo: 201, mensaje:"Compra efectuada" })
        })
        .catch(function(error){
            console.log(error)
            response.statusCode = error.codigo
            response.json(error)
        })
}

//GET /clientes/:idCliente/pedidos
function listarPedidosPorCliente(request, response){

    let idCliente = request.params.idCliente

    negocioPedidos.listarPedidosPorCliente(idCliente, request.autoridad)
        .then( listado => {
            response.json(listado)
        })
        .catch(function(error){
            //El cliente intenta listar pedidos de otra persona
            //Fallo dramático en la bb.dd o la aplicación
            console.log(error)
            response.statusCode = error.codigo
            response.json(error)
        })
}

