const vipExpress = require("express")
const negocioFacturas = require("../modelo/negocio/negocioFacturas")

let router = vipExpress.Router()

router.get("/clientes/:idCliente/facturas", listarFacturasPorCliente)
//router.get("/facturas/:id", buscarFactura)

exports.router = router

async function listarFacturasPorCliente(request, response){

    let idCliente = request.params.idCliente
    try {
        let listado = await negocioFacturas.listarFacturasPorCliente(idCliente, request.autoridad)
        response.json(listado)    
    } catch (error){
        response.statusCode = error.codigo
        response.json(error)
    }    

}

