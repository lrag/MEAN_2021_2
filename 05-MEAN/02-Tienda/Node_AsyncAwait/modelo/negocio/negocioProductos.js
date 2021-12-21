//const x = require("../entidades/esquemaProducto")
//x.Producto.find()

const Producto = require("../entidades/esquemaProducto").Producto
//Producto.find()

const validacionUtil = require("../../util/validacionUtil")

let reglasProductoInsercion = {
    nombre      : "required|min:3|max:20",
    categoria   : "required|min:3|max:20",
    fabricante  : "required|min:3|max:50",
    descripcion : "required|min:20",
    precio      : "numeric",
    existencias : "numeric",
}

//Autorizacion: el usuario que inserta debe ser EMPLEADO
exports.insertarProducto = function(producto, autoridad){
    
    return new Promise(function(resolve, reject){
        //Autorizacion
        if(autoridad.rol != "EMPLEADO"){
            reject({ codigo:403, mensaje:"Solo los empleados pueden añadir productos"})
            return
        }

        //Validación
        if(!validacionUtil.validar(producto, reglasProductoInsercion, reject)){
            return
        }

        //Insertar el producto
        let productoMG = new Producto(producto)
        productoMG
            .save()
            .then( productoInsertado => {
                resolve(productoInsertado)
            })
            .catch(err => {
                console.log(err)
                reject({ codigo:500, mensaje:'Error en la base de datos, TJ'})
            })        
    })
}

//Autorización: el usuario debe estar autenticado
exports.listarProductos = function(criterio){

    return new Promise(function(resolve, reject){
        //Aquí es donde se listan los productos
        //Si se logran listar la promesa invoca resolve y entrega los productos
        //Si no, invoca reject y pasa un error
        Producto
            .find({})
            .then( productos => {
                resolve(productos)
            })
            .catch(err => {
                console.log(err)
                reject({ codigo:500, mensaje:'Error en la base de datos, JDT'})
            })
    })


}






