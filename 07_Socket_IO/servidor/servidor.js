//npm install socket.io
const socketIO = require("socket.io")
const http = require("http")

//Utilizaremos express para servir el cliente (y para otra cosa)
const express = require("express")

let app = express()
app.use(express.static("./recursos"))
app.listen(80, function(){
    console.log("Esperando peticiones HTTP en el puerto 80")
})

//Socket.io no es una implementación de websockets (aunque lo utiliza y se le parece mucho)
//
//Necesitamos abrir un puerto para recibir las solicitudes de conexión
//Para ello utilizamos el módulo 'http'
//
//Creamos un objeto server normal y corriente
let servidor = http.createServer(function(request, response){})

//Una vez que disponemos de un objeto server escuchando en un puerto
//podemos crear la infraestructura de Socket.io
const io = socketIO(
    servidor,
    {
        //Configuración para el CORS
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });
//Y arrancamos el servidor
servidor.listen(8000, function(){
    console.log("Esperando conexiones Socket.IO en el puerto 8000")
})



