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
exports.insertarProducto = async function(producto, autoridad){

    //Autorizacion
    if(autoridad.rol != "EMPLEADO"){
        throw { codigo:403, mensaje:"Solo los empleados pueden añadir productos"}
    }

    //Validación
    let errorValidacion = validacionUtil.validar(producto, reglasProductoInsercion)
    if(errorValidacion!=null){
        throw errorValidacion
    }

    //Insertar el producto
    try{
        let productoMG = new Producto(producto)
        return await productoMG.save()
    } catch(error) {
        throw { codigo:500, mensaje:'Error en la base de datos, TJ'}
    }

}

//Autorización: el usuario debe estar autenticado
exports.listarProductos = async function(criterio){
    //Aquí es donde se listan los productos
    //Si se logran listar la promesa invoca resolve y entrega los productos
    //Si no, invoca reject y pasa un error    
    try{
        return await Producto.find({})
    } catch (error) {
        throw { codigo:500, mensaje:'Error en la base de datos, JDT' }
    }
}

