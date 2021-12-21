const vipExpress = require("express")
const negocioProductos = require("../modelo/negocio/negocioProductos")

let router = vipExpress.Router()

router.post("/productos", insertarProducto)
router.get("/productos", listarProductos)
//router.get("/productos/:id", buscarProducto)
//router.patch("/productos/:id", modificarProducto)
//router.delete("/productos/:id", borrarProducto)

exports.router = router

///////////////////////////////////////////
//Funciones de la lógica de control      //
///////////////////////////////////////////
//
//Reciben el request y el response
//Su tarea consiste en:
//-extraer del request la información necesaria
//  -query parameters (?)
//  -valores incluidos en la ruta (:)
//  -valores presentes en los headers
//  -movidas en el body
//
//-invocar la función con la lógica de negocio
//
//-configurar la respuesta
//
//-Y YA

//GET /productos?criterio...
async function listarProductos(request, response){
    //Extraer el criterio de la peticion...
    try {
        let listado = await negocioProductos.listarProductos(/*criterio*/)
        response.json(listado)
    } catch (error){
        response.statusCode = error.codigo
        response.json(error)
    }
}


//POST /productos
//CT: app/json
//--------------
//{ producto }
function insertarProducto(request, response){
    
    let producto = request.body
    console.log("Alta producto (LC): ", producto)

    negocioProductos
        .insertarProducto(producto, request.autoridad)
        .then(function(productoInsertado){
            response.statusCode = 201
            response.json({ codigo:201, mensaje:"Producto insertado", id:productoInsertado.id })
        })
        .catch(function(error){
            //Este catch se ejecuta si:
            //-los datos son invalidos
            //-el usuario no tiene permisos
            //-fallo catastrófico
            console.log("=========================================================")
            console.log(error)
            response.statusCode = error.codigo
            response.json(error)
        })
}

