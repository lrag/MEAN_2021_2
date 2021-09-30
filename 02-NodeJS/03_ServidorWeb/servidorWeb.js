
const http = require("http")
const { gzipSync } = require("zlib")

let servidor = http.createServer( function(request, response){

    let metodo = request.method
    let url    = request.url
    
    console.log("========================================================")
    console.log("Petición recibida: "+metodo+" "+url)

    //Solo vamos a aceptar peticiones GET
    if( metodo.toUpperCase() != "GET"){
        response.statusCode = 405
        response.end("<html><body>METODO NO SOPORTADO</body></html>")
        return
    }

    response.end()

} )

//La funcion 'listen' es asíncrona
servidor.listen(2000, function(){ 
    console.log("Esperando peticiones en el puerto 2000") 
})



