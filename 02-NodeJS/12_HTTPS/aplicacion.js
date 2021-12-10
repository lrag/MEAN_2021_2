//Esta librería no necesita npm install
const https = require("https")
const http = require("http")
const fs = require("fs")
const express = require("express")

//let servidor = https.createServer(certificado, funcion)
//
//Certificado:
//{
//  key  : XXX
//  cert : YYY
//}

let app = express()
app.get('/inicio', function(rq, rp){
    rp.end("BIENVENIDO HOMBRE OCCIDENTAL")
})
app.get('/movida', function(rq, rp){
    rp.end("MOVIDAS")
})

//Creamos el server utilizando el módulo 'https' y le proporcionamos
//la función express y el certificado
let cert = {
    key  : fs.readFileSync("./certificado/server.key"),
    cert : fs.readFileSync("./certificado/server.cert") 
}
let servidorHttps = https.createServer(cert, app)
servidorHttps.listen(443, function(){
    console.log("Esperando peticiones https en el puerto 443")
}) 

http.createServer(function(request, response){
    response.end("POR FAVOR, HAZME LA PETICION A 'HTTPS://localhost:443/inicio'")
    response.writeHead(301, {
        Location : 'https://localhost:443/'+request.url
      });
    response.end();    
}).listen(80, function(){
    console.log("Esperando peticiones http en el puerto 80")
})