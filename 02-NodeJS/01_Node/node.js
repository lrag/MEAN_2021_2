//
//En node podremos hacer cosas imposibles en el navegador
//-acceder al sistema de archivos
//-comunicarnos con otras aplicaciones (por ejemplo la BB.DD)
//-enviarle comandos al SO
//
//En node.js no disponemos de la mayoría de los objetos implícitos del navegador
//-document
//-window
//-alert
//-localStorage/sessionStorage
//-...
//
//Algunos si están:
//-console
//-JSON
//-...

//La consola en node es la consola del sistema
console.log("Hola mundo")

//Módulos en node
const http = require("http")


//let funcioncilla = function(request, response){
//    ...
//}
//let servidorHTTP = http.createServer(funcioncilla)

let servidorHTTP = http.createServer( function(request, response){
    console.log("Petición recibida en el puerto 1000")
} )

servidorHTTP.listen(1000)





