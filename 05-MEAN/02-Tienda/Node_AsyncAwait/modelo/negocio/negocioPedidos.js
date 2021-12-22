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

exports.comprar = async function (pedido, autoridad){
  
    try {
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
        let errores = validacionUtil.validar(pedido, reglasPedido)
        if(errores){
            throw { codigo:400, mensaje:"Datos invalidos"}
        }

        if(pedido?.usuario?._id != autoridad._id){
            throw { codigo:403, mensaje:"AL LADROOOOOON!!!!!!!"}
        }

        let usuarioMG = await Usuario.findById(pedido.usuario._id)
        pedido.usuario = usuarioMG
        console.log("Usuario encontrado:"+pedido.usuario.nombre)

        //Aqui ya no buscamos los productos en paralelo :(
        console.log("Buscando los productos para completar los datos de los detalles")
        for(let detalle of pedido.detalles){ 
            let productoMG = await Producto.findById(detalle.producto._id)
            if(!productoMG){
                throw { codigo:400, mensaje: "No existe el producto: "+detalle.producto._id }
            } 
            detalle.precio = productoMG.precio
            detalle.producto = productoMG
        }
        console.log("Se han encontrado todos los productos")
        
        console.log("Calculando el total del pedido")
        let totalPedido = 0
        for(let detalle of pedido.detalles){
            totalPedido += detalle.cantidad*detalle.producto.precio
        }
        console.log("Total:"+totalPedido)
        pedido.total = totalPedido        

        //Vamos a modificar los productos en paralelo :)
        let arrayDePromesas = []
        for(let detalle of pedido.detalles){
            detalle.producto.existencias = detalle.producto.existencias-detalle.cantidad
            let promesa = detalle.producto.save()
            arrayDePromesas.push(promesa)
        }
        await Promise.all(arrayDePromesas)

        console.log("Existencias actualizadas")
        let factura = await negocioFacturas.crearFactura(pedido)
        console.log("Factura insertada")
        pedido.factura = factura._id //Aqui deberíamos guardar la factura entera como en Toronto
        pedido.estado = "FACTURADO"
        pedido.codigo = "PED-"+Math.round(Date.now()/100) //Por poner algo
        
        let pedidoMG = new Pedido(pedido)
        pedidoMG.usuario = pedido.usuario
        await pedidoMG.save()   
        console.log("Pedido insertado")
        //FIN
        return
    } catch (error) {
        console.log("AL MENOS UN PRODUCTO NO EXISTIA O HA PETADO LA BB.DD")
        console.log(error)
        throw { codigo:500, mensaje:"Error en la bb.dd" }
    }
}

exports.listarPedidosPorCliente = async function(idCliente, autoridad){
        
    if(idCliente!=autoridad._id){
        throw { codigo:403, mensaje:"Los clientes solo pueden ver sus pedidos"}
    }
    
    try {
        let pedidos = Pedido.find({ "usuario._id" : new ObjectID(idCliente)})
        return pedidos
    }
    catch( error ){
        throw { codigo:500, mensaje:'Error en la base de datos, JDT'}
    }

}