const vipExpress = require("express")
const negocioFacturas = require("../modelo/negocio/negocioFacturas")

let router = vipExpress.Router()

router.get("/clientes/:idCliente/facturas", listarFacturasPorCliente)
//router.get("/facturas/:id", buscarFactura)
//router.patch("/facturas/:id", modificarFacturas)
//router.delete("/facturas/:id", borrarFactura)

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

//GET /clientes/:idCliente/facturas
function listarFacturasPorCliente(request, response){

    let idCliente = request.params.idCliente

    negocioFacturas.listarFacturasPorCliente(idCliente, request.autoridad)
        .then( listado => {
            response.json(listado)
        })
        .catch(function(error){
            response.statusCode = error.codigo
            response.json(error)
        })
}

