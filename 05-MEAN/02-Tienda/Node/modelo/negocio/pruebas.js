const mongoose = require("mongoose")
const Producto = require("../entidades/esquemaProducto").Producto
mongoose.connect("mongodb://localhost:27017/tienda") 

let pedido = {
    detalles : [
        {
            cantidad : 1,
            producto : {
                _id : "619f493f13701363c9714cb9"
            }
        },
        {
            cantidad : 2,
            producto : {
                _id : "619f493f13701363c9714cba"
            }
        },
        {
            cantidad : 3,
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
function prueba2(){

    let arrayDePromesas = []
    for(let detalle of pedido.detalles){
        let promesa = new Promise(function(resolve, reject){
            Producto
                .findById(detalle.producto._id)
                .then( producto => {
                    if(producto){
                        resolve(producto)
                        return
                    } 
                    reject("No existe el producto: "+detalle.producto._id)
                })
                .catch( err => reject("ERROR CON LA BB.DD"))
        })
        arrayDePromesas.push(promesa)
    }

    //insertar factura

    Promise
        .all(arrayDePromesas)
        .then( arrayDeProductos => { 
            console.log("SE HAN ENCONTRADO TODOS LOS PRODUCTOS")
            //arrayDeProductos es un array en el que están los valores devueltos por las promesas que hemos recopilado
            console.log("Número de productos:"+arrayDeProductos.length)
            for(let producto of arrayDeProductos){
                console.log(producto.nombre)
            }
        })
        .catch( err => {
            console.log("AL MENOS UN PRODUCTO NO EXISTIA O HA PETADO LA BB.DD")
            console.log(err)
        })

}


prueba2()
console.log("FIN en falso")

    
