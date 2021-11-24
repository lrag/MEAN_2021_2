const mongoose = require("mongoose")

let esquemaProducto = new mongoose.Schema({
    //Si queremos que sea el driver el que le de valor al _id no lo añadiremos al esquema            
    //_id       : ObjectID,
    nombre      : String,
    categoria   : String,
    fabricante  : String,
    descripcion : String,
    imagen      : String,
    precio      : Number,
    existencias : Number       
})

//Exportamos el modelo
exports.Producto = mongoose.model('productos', esquemaProducto)

/*
function Producto(obj){
    this.nombre = obj.nombre
    this.categoria = obj.categoria
    this.fabricanta = obj.fabricante
    //..
}
Producto.prototype.save = function(){
    console.log("Me inserto!")
    //esquema.collection('productos').insertOne({...})
}
Producto.prototype.remove = function(){
    //esquema.collection('productos').updateOne({...})
}
Producto.findById = function(id){
    //....
    return new Producto({ nombre:'Fleje' })
}

let producto = new Producto({ culo:"culete", nombre:'Chintáfono', categoria:'Elementos disrruptores', fabricante:'Ibérica de Chintáfonos S.A.'})
producto.save()
console.log(producto)
let producto2 = Producto.findById(123)
console.log(producto2)
*/
