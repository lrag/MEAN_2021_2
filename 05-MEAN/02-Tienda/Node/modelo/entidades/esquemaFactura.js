const mongoose = require("mongoose")
const ObjectID = require("bson").ObjectID
const Producto = require("./esquemaProducto").Producto

let esquemaFactura = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id no lo añadiremos al esquema            
    //_id       : ObjectID,
    codigo      : String,
    fecha       : String,
    estado      : String,
    direccion   : String,
    formaPago   : String,
    total       : Number,       

	usuario : {
		_id       : ObjectID,
        nombre    : String,
        direccion : String,
        telefono  : String,
        correoE   : String,
	},
 
    detalles : [{
            cantidad : Number,
            precio   : Number,
            producto : Producto.schema
        }],

    pedido : ObjectID

})

//Exportamos el modelo
exports.Factura = mongoose.model('facturas', esquemaFactura)
