const Factura = require("../entidades/esquemaFactura").Factura
const ObjectID = require("bson").ObjectID

exports.listarFacturasPorCliente = async function(idCliente, autoridad){

    if(idCliente!=autoridad._id){
        throw { codigo:403, mensaje:"Los clientes solo pueden ver sus facturas"}
    }        

    try{
        let facturas = await Factura.find({ "usuario._id" : new ObjectID(idCliente)})
        return facturas
    } catch (error){
        throw { codigo:500, mensaje:'Error en la base de datos, JDT'} 
    }

}

exports.crearFactura = async function(pedido){

    try {
        let facturaMG = new Factura(pedido)
        facturaMG.codigo = "FAC-1"+Math.round(Date.now()/100) //Por poner algo
        facturaMG.usuario = pedido.usuario
        let facturaInsertada = await facturaMG.save()
        return facturaInsertada
    } catch(error){
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' } 
    }

}





