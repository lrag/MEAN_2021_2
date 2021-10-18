const fs   = require("fs")

//Este módulo viene con Node.JS
const zlib = require("zlib")

//Variables globales
let statusCodes = {
    400 : "Petición icorrecta",
    404 : "El recurso solicitado no existe",
    405 : "Método HTTP no admitido",
    500 : "Error interno en el servidor"
}

let contentTypes = {
    html : { contentType : "text/html"             , funcion : lectorTexto }, 
    css  : { contentType : "text/css"              , funcion : lectorTexto },
    js   : { contentType : "application/javascript", funcion : lectorTexto },
    ico  : { contentType : "image/x-icon"          , funcion : lectorBinario },
    jpg  : { contentType : "image/jpeg"            , funcion : lectorBinario },
    png  : { contentType : "image/png"             , funcion : lectorBinario }    
}

//Esta es la función que comenzará a procesar todas las peticiones
//Será ejecutada por el hilo del event loop
exports.devolverContenidoEstatico = function(request, response){

    let metodo = request.method.toUpperCase()
    let url = request.url

    //Solo admitiremos peticiones GET
    if(metodo != "GET"){
        //
        devolverError(405,response)
        return
    }

    //Retiramos los posibles parámetros para quedarnos con el nombre del recurso
    ruta = url.split("?")[0]

    ruta = "./recursos"+ruta
    //ruta = "./recursos"+ruta

    console.log("Buscando el recurso:"+ruta)
    let extension = ruta.split(".").pop().toLowerCase() //html, js, css, jpg, ico...

    /*
    if(extension=="html" || extension=="js" || extension=="css"){
        lectorTexto(ruta, "", response)
    } else if(extension=="ico" || extension=="jpg" || extension=="png"){
        lectorBinario(ruta, "", response)
    } else {
        //NO SE QUE ME PIDES
    }
    */

    let contentType = contentTypes[extension]
    //La línea con la que te estalla el celebro:
    contentType.funcion(ruta, contentType.contentType, response)
}

function lectorTexto(ruta, contentType, response){

    fs.readFile(ruta, function(err, contenidoBuffer){
        if(err){
            //Para simplificar supondremos que hay un error es porque el fichero no existe
            //404
            devolverError(404,response)
            return
        }

        let contenido = contenidoBuffer.toString()
        response.setHeader("content-type", contentType)
        response.end(contenido)
    })
}

//Leera el fichero y lo colocará en el body de la respuesta con response.end(contenido del fichero)
function lectorBinario(ruta, contentType, response){

    fs.readFile(ruta, function(err, contenidoBuffer){
        if(err){
            //Para simplificar supondremos que hay un error es porque el fichero no existe
            //404
            devolverError(404,response)
            return
        }

        zlib.gzip(contenidoBuffer, function (err, result) {  
            if(err){
                console.log(err)
                devolverError(500, response)
                return
            }
            //console.log(result)
            response.setHeader("Content-Type", contentType) 
            response.setHeader("Content-Encoding", "gzip")
            response.end(result)
        });
    })
}

function devolverError(statusCode, response){

    let mensaje = statusCodes[statusCode]

    let html = `
        <html>
            <head>
                <meta charset="UTF-8">
            </head>
            <body>
                <h1 align="center">
                    <font color="lightGreen">
                        WebServer 3000
                    </font>
                </h1>
                <h2 align="center">
                    <font color="lightBlue">
                        Se ha producido un error
                    </font>
                </h2>
                <h1 align="center">
                    <font color="red">
                        ${statusCode}
                    </font>
                    ${mensaje}
                </h1>
            </body>
        </html>`

    response.setHeader("content-type","text/html")
    response.end(html)
}


