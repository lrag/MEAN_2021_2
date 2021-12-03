const Producto = require("../entidades/esquemaProducto").Producto

let reglasPedido = {
    direccion  : 'required',
    formaPago  : 'required',
    fecha      : 'required',
}

exports.comprar = function(pedido, autoridad){

    return new Promise(function(resolve, reject){
        
        //Comprobar que el id del token es el mismo que el usuario del pedido
        if(autoridad._id != pedido.usuario._id){
            reject({ codigo:403, mensaje:'AL LADRON!!!!'})
            return             
        }

        let arrayDePromesas = []
        for(let detalle of pedido.detalles){

            Producto.findById(detalle.producto._id)
            .then( productoEncontrado => {
                console.log(productoEncontrado.nombre)
            })
            .catch( err => console.log(err))

        }
    



        //crear la factura




        //Validar los datos
    
        //Recalcular el total
    
        //comprobar y reducir las existencias
    
        //crear una factura
    
        //modificar el pedido a 'FACTURADO' y ver si hay que hacer una copia

    })





}