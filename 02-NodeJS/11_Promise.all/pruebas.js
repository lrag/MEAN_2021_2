const mongoose = require("mongoose")
const Producto = require("./esquemaProducto").Producto
const Factura  = require("./esquemaFactura").Factura
const Pedido   = require("./esquemaPedido").Pedido
const Usuario  = require("./esquemaUsuario").Usuario
mongoose.connect("mongodb://localhost:27017/tienda") 

console.log("==============================================")
console.log("= Disfrutando con las promesas               =")
console.log("==============================================")

let pedido = {
    usuario  : {
        _id : "6193abddfffafdfa7399c35a"
    },
    detalles : [
        {
            cantidad : 1,
            precio   : 10,
            producto : {
                _id : "619f493f13701363c9714cb9"
            }
        },
        {
            cantidad : 2,
            precio   : 11,
            producto : {
                _id : "619f493f13701363c9714cba"
            }
        },
        {
            cantidad : 300,
            precio   : 12,
            producto : {
                _id : "619f493f13701363c9714cbb"
            }
        },
    ]
}

/*
function prueba1(){
    let arrayDePromesas = []
    for(let detalle of pedido.detalles){
        //La promesa que devuelve 'findbyId' hace resolve aunque no haya encontrado el producto
        arrayDePromesas.push(Producto.findById(detalle.producto._id))    
    }

    Promise
        .all(arrayDePromesas)
        .then( arrayDeProductos => { 
            //Resultado es un array en el que están los valores devueltos por las promesas que hemos recopilado
            console.log("FIN:"+arrayDeProductos.length)
            for(let producto of arrayDeProductos){
                //Es posible que alguna de esas promesas se haya cumplido pero que no haya producto
                if(producto){
                    console.log(producto.nombre)
                } else {
                    console.log("Producto inexistente")
                }
            }
        })
        .catch( err => {
            console.log(err)
        })

    console.log("FIN en falso")
}
*/

////////////////////
//Esta es la buena//
////////////////////
function prueba2(pedido){

    /*
    1-Buscar los datos del usuario
    2-Buscar los productos para completar los datos de los detalles
    3-Calcular el total del pedido
    4-Reducir las existencias de los productos
    5-Insertar el pedido como 'FACTURADO'
    6-Insertar la factura con una referencia al pedido
    */

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
            //Con Pro☺mise.all podemos 'detener el proceso' hasta que se cumplan o fallen las promesas contenidas en un array
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
            let facturaMG = new Factura(pedido)
            facturaMG.codigo = "FAC-1"
            facturaMG.usuario = pedido.usuario
            return facturaMG.save()
        })
        .then( resultado => {
            console.log("Factura insertada")
            pedido.factura = resultado._id
            pedido.estado = "FACTURADO"
            let pedidoMG = new Pedido(pedido)
            pedidoMG.usuario = pedido.usuario
            return pedidoMG.save()
        })
        .then( resultado => {
            console.log("Pedido insertado")
            console.log(resultado)
        })
        .catch( err => {
            console.log("AL MENOS UN PRODUCTO NO EXISTIA O HA PETADO LA BB.DD")
            console.log(err)
        })
}

prueba2(pedido)
console.log("FIN en falso")




















