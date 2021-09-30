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
        response.statusCode = 405
        response.end("<html><body>METODO NO SOPORTADO</body></html>")
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
            response.statusCode = 404
            response.end("<html><body>RECURSO NO ENCONTRADO</body></html>")
            return
        } 
        let contenido = buffer.toString()
        
        response.end(contenido)
    })
}


