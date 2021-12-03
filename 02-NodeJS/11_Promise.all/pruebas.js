const mongoose = require("mongoose")
const Producto = require("./esquemaProducto").Producto
const Factura = require("./esquemaFactura").Factura
mongoose.connect("mongodb://localhost:27017/tienda") 

console.log("==============================================")
console.log("= Disfrutando con las promesas               =")
console.log("==============================================")

let pedido = {
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
            cantidad : 3,
            precio   : 12,
            producto : {
                _id : "619f493f13701363c9714cbb"
            }
        },
    ]
}

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

////////////////////
//Esta es la buena//
////////////////////
function prueba2(pedido){

    //No sabemos cuantas busquedas hay que hacer
    //Tenemos que lanzarlas en un bucle
    //No podemos concatenarlas
    //Tenemos que esperar a que se ejecuten todas las busquedas para continuar con el proceso
    //
    //Metemos las promesas en un array:
    let arrayDePromesas = []
    for(let detalle of pedido.detalles){
        let promesa = new Promise(function(resolve, reject){
            Producto
                .findById(detalle.producto._id)
                .then( producto => {
                    if(!producto){
                        reject("No existe el producto: "+detalle.producto._id)
                        return
                    } 
                    detalle.precio = producto.precio
                    detalle.producto = producto
                    resolve(detalle)
                })
                .catch( err => reject("ERROR CON LA BB.DD"))
        })
        arrayDePromesas.push(promesa)
    }

    //Con Promise.all podemos 'detener el proceso' hasta que se cumplan o fallen las promesas contenidas en un array
    Promise
        .all(arrayDePromesas)
        .then( arrayDeDetalles => { 
            console.log("SE HAN ENCONTRADO TODOS LOS PRODUCTOS")
            //arrayDeDetalles es un array en el que están los valores devueltos por las promesas que hemos recopilado
            let totalPedido = 0
            for(let detalle of arrayDeDetalles){
                totalPedido += detalle.cantidad*detalle.producto.precio
            }
            console.log("Total:"+totalPedido)
            pedido.total = totalPedido

            let factura = new Factura(pedido)
            factura.codigo = "FAC-1"
            return factura.save()
        })
        .then( resultado => {
            console.log("Factura insertada")
        })
        .catch( err => {
            console.log("AL MENOS UN PRODUCTO NO EXISTIA O HA PETADO LA BB.DD")
            console.log(err)
        })
}

prueba2(pedido)
console.log("FIN en falso")

    
























