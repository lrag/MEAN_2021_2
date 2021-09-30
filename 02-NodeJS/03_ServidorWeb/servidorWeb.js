const http = require("http")
const fs   = require("fs")

let servidor = http.createServer(procesarPeticion)

//La funcion 'listen' es asíncrona
servidor.listen(2000, function(){ 
    console.log("Esperando peticiones en el puerto 2000") 
})

////////////////////////////////////////////

function procesarPeticion(request, response){

    let metodo = request.method
    let url    = request.url
    
    console.log("========================================================")
    console.log("Petición recibida: "+metodo+" "+url)

    //Solo vamos a aceptar peticiones GET
    if( metodo.toUpperCase() != "GET"){
        devolverError(response, 405, "Método no permitido")
        return
    }
    
    leerRecurso(url, response)

} 

function leerRecurso(url, response){
    //ReadFileSync dejará bloqueado al hilo principal!!!!!
    //return fs.readFileSync("./recursos"+url)

    let ruta = "./recursos"+url
    fs.readFile(ruta, function(error, buffer){
        if(error){
            console.log("Fallo al leer el fichero:", error)
            devolverError(response, 404, "Recurso no encontrado")
            return
        } 
        let contenido = buffer.toString()
        
        response.end(contenido)
    })
}

function devolverError(response, statusCode, mensaje){
    response.statusCode = statusCode

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


    response.end(html)
}
