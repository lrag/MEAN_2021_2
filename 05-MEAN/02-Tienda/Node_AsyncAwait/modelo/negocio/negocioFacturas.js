const Factura = require("../entidades/esquemaFactura").Factura
const ObjectID = require("bson").ObjectID

exports.listarFacturasPorCliente = function(idCliente, autoridad){

    return new Promise(function(resolve, reject){

        if(idCliente!=autoridad._id){
            reject({ codigo:403, mensaje:"Los clientes solo pueden ver sus facturas"})
            return
        }        

        Factura
            .find({ "usuario._id" : new ObjectID(idCliente)})
            .then( facturas => {
                resolve(facturas)
            })
            .catch(err => {
                console.log(err)
                reject({ codigo:500, mensaje:'Error en la base de datos, JDT'})
            })
    })

}

exports.crearFactura = async function(pedido){

    try {
        let facturaMG = new Factura(pedido)
        facturaMG.codigo = "FAC-1"+Math.round(Date.now()/100) //Por poner algo
        facturaMG.usuario = pedido.usuario
        let facturaInsertada = await facturaMG.save()
        return facturaInsertada
    } catch(error){
        throw new Error({ codigo:500, mensaje:'Error en la base de datos, JDT'})
    }

}





