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

//Socket.IO funciona con orientación a eventos

//Eventos en el servidor:
//-un cliente se ha conectado
//-un cliente se ha desconectado
//-un cliente nos ha enviado un mensaje

//io.on(<nombre_evento>, function manejadora de ese evento)

//En este array gurdaremos la lista con los alias de los usuarios conectados
let aliasUsuarios = []

io.on("connection", function(socket){
    console.log("Nueva conexión")

    //Dentro de las funciones que pasamos como parámetro para manejar eventos
    //'this' será el socket
    socket.on("disconnect",usuarioDesconectado)
    socket.on("alias", aliasRecibido)
    socket.on("mensaje", mensajeRecibido)
})

//Dentro de las funciones 
function usuarioDesconectado(){
    console.log("Usuario desconectado")

    //Sacar el alias de la lista
    for(let a=0; a<aliasUsuarios.length; a++){
        if(aliasUsuarios[a]==this.alias){
            aliasUsuarios.splice(a,1)
            break
        }
    }

    //Enviar la nueva lista a los usuarios conectados
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))
}

function aliasRecibido(alias){
    console.log("Alias recibido:"+alias)
    //Debemos asociar el alias al socket
    //aqui 'this' es el socket 
    this.alias = alias

    //Comprobamos que el alias no esté repetido
    for(let a of aliasUsuarios){
        if(a == alias){
            this.emit("aliasRepetido","pues eso")
            return
        }
    }


    //Metemos el alias en la lista
    aliasUsuarios.push(alias)

    //Avisamos a todos los que están conectados (lo cual incluye al que se acaba de conectar) 
    //del cambio en la lista de participantes
    io.emit("aliasUsuarios", JSON.stringify(aliasUsuarios))
}

function mensajeRecibido(mensaje){
    //Mensaje es un JSON con dos propiedades:
    //-alias
    //-texto
    let m = JSON.parse(mensaje)
    //console.log(`Mensaje recibido de ${this.alias}:${m.texto}`)
    console.log(`Mensaje recibido de ${m.alias}:${m.texto}`)

    //Para enviar un mensaje desde el servidor al cliente:
    //Si queremos enviarselo a solo un cliente usamos su socket
    //socket.emit("clave", "valor")

    //Si queremos enviar un mensaje a todos los sockets que haya (broadcast)
    io.emit("mensaje", mensaje)
}