const mongoose = require("mongoose")
const ObjectID = require("bson").ObjectID
const Producto = require("./esquemaProducto").Producto

let esquemaPedido = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id no lo añadiremos al esquema            
    //_id       : ObjectID,
    codigo      : String,
    fecha       : String,
    estado      : String,
    direccion   : String,
    formaPago   : String,
    total       : Number,       

	//Si queremos solo el _id:
	//usuario   : ObjectID,

	//Si queremos el usuario entero
	//usuario : Usuario.schema

	//Si queremos un subconjunto de las propiedades del usuario
	usuario : {
		_id       : ObjectID,
        //login     : String,
        //password  : String,
        //rol       : String,
        nombre    : String,
        direccion : String,
        telefono  : String,
        correoE   : String,
        //idioma    : String  
	},
 
    detalles : [{
            cantidad : Number,
            precio   : Number,
            producto : Producto.schema
        }]

    //factura : ?

})

//Exportamos el modelo
exports.Pedido = mongoose.model('pedidos', esquemaPedido)
