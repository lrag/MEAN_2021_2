const Usuario = require("../entidades/esquemaUsuario").Usuario
const Producto = require("../entidades/esquemaProducto").Producto
const Factura = require("../entidades/esquemaFactura").Factura
const Pedido = require("../entidades/esquemaPedido").Pedido
const ObjectID = require("bson").ObjectID
const validacionUtil = require("../../util/validacionUtil")
const negocioFacturas = require("./negocioFacturas")

let reglasPedido = {
    direccion  : 'required',
    formaPago  : 'required',
    fecha      : 'required',
    usuario    : 'required'
}


exports.comprar = function (pedido, autoridad){

    return new Promise(function(resolve, reject){
        
        console.log("==============================================")
        /*
        1-Validar los datos recibidos
        2-Buscar los datos del usuario
        3-Buscar los productos para completar los datos de los detalles
        4-Calcular el total del pedido
        5-Reducir las existencias de los productos
        6-Insertar el pedido como 'FACTURADO'
        7-Insertar la factura con una referencia al pedido
        */
        if(!validacionUtil.validar(pedido, reglasPedido, reject)){
            return
        }

        if(pedido?.usuario?._id != autoridad._id){
            reject({ codigo:403, mensaje:"AL LADROOOOOON!!!!!!!"})
            return
        }

        //1-Buscamos el usuario y se lo asignamos al pedido
        Usuario
            .findById(pedido.usuario._id)
            .then( usuarioMG => {
                pedido.usuario = usuarioMG
                console.log("Usuario encontrado:"+pedido.usuario.nombre)

                //No sabemos cuantas busquedas hay que hacer
                //Tenemos que lanzarlas en un bucle
                //No podemos concatenarlas
                //Tenemos que esperar a que se ejecuten todas las busquedas para continuar con el proceso
                //
                //Metemos las promesas en un array:
                let arrayDePromesas = []
                for(let detalle of pedido.detalles){
                    //Esta es la promesa de buscar un producto y, si se encuentra, añadir los datos que le faltan al detalle
                    //Hace el resolve con el detalle, no con el producto encontrado!!!
                    let promesa = new Promise(function(resolve, reject){
                        Producto
                            .findById(detalle.producto._id)
                            .then( productoMG => {
                                if(!productoMG){
                                    reject("No existe el producto: "+detalle.producto._id)
                                    return
                                } 
                                detalle.precio = productoMG.precio
                                detalle.producto = productoMG
                                resolve(detalle)
                            })
                            .catch( err => {
                                console.log(err)
                                reject("ERROR CON LA BB.DD")
                            })
                    })
                    arrayDePromesas.push(promesa)
                }
                //Con Promise.all podemos 'detener el proceso' hasta que se cumplan o fallen las promesas contenidas en un array
                console.log("Buscando los productos para completar los datos de los detalles")
                return Promise.all(arrayDePromesas)
            })
            .then( arrayDeDetalles => { 
                console.log("Se han encontrado todos los productos")
                //arrayDeDetalles es un array en el que están los valores devueltos por las promesas que hemos recopilado
                console.log("Calculando el total del pedido")
                let totalPedido = 0
                for(let detalle of arrayDeDetalles){
                    totalPedido += detalle.cantidad*detalle.producto.precio
                }
                console.log("Total:"+totalPedido)
                pedido.total = totalPedido

                //Ahora tenemos que reducir las existencias y vuelve a suceder que no sabemos de antemano cuantas 
                //consultas serán así que volvemos a recopilar una serie de promesas en un array
                arrayDePromesas = []
                for(let detalle of pedido.detalles){
                    detalle.producto.existencias = detalle.producto.existencias-detalle.cantidad
                    let promesa = detalle.producto.save()
                    arrayDePromesas.push(promesa)
                }
                console.log("reduciendo las existencias")
                return Promise.all(arrayDePromesas)
            })
            .then( x => {
                console.log("Existencias actualizadas")
                return negocioFacturas.crearFactura(pedido)
            })
            .then( facturaInsertada => {
                console.log("Factura insertada")
                pedido.factura = facturaInsertada._id
                pedido.estado = "FACTURADO"
                pedido.codigo = "PED-"+Math.round(Date.now()/100) //Por poner algo
                let pedidoMG = new Pedido(pedido)
                pedidoMG.usuario = pedido.usuario
                return pedidoMG.save()
            })
            .then( resultado => {
                console.log("Pedido insertado")
                resolve()
            })
            .catch( err => {
                console.log("AL MENOS UN PRODUCTO NO EXISTIA O HA PETADO LA BB.DD")
                console.log(err)
                reject({ codigo:500, mensaje:"Error en la bb.dd" })
            })
    })
}

exports.listarPedidosPorCliente = function(idCliente, autoridad){

    return new Promise(function(resolve, reject){

        if(idCliente!=autoridad._id){
            reject({ codigo:403, mensaje:"Los clientes solo pueden ver sus pedidos"})
            return
        }

        Pedido
            .find({ "usuario._id" : new ObjectID(idCliente)})
            .then( pedidos => {
                resolve(pedidos)
            })
            .catch(err => {
                console.log(err)
                reject({ codigo:500, mensaje:'Error en la base de datos, JDT'})
            })
    })

}