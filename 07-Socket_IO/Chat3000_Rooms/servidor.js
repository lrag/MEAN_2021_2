//npm install socket.io
const socketIO = require("socket.io")
const http = require("http")

//Utilizaremos express para servir el cliente y un api rest con las salas
const express = require("express")
let app = express()

//Api rest para las salas
let salas = [ "General", "Sala 1", "Sala 2", "Sala 3", "Sala 4" ]
app.get("/salas", (request, response) => {
    response.json(salas)
})

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
    socket.on("cambiarSala", cambiarSala)

    //Rooms en socket.io
    //Identificadas con una cadena de texto
    //Los sockets pueden unirse a cualquier número de 'rooms' con socket.join('nombre_room')
    //Pueden abandonarlas con socket.leave('nombre_room')
    //
    //Para enviar un mensaje a todos los sockets que esten en un 'room':
    //io.to('nombre_room').emit('clave_mensaje','mensaje)
    //Se pueden concatenar varias salas y así enviar un mensaje a los sockets de todas ellas
    //io.to('nombre_room_1').to('nombre_room_2').emit('clave_mensaje','mensaje')

    //Para averiguar en cuantas 'rooms' está un socket podemos invocar socket.rooms
    //Devuelve un SET con todas las rooms

    //Nada mas crearse un socket este se añade a una 'room' en la que únicamente está él
    //El nombre de ese 'room' será el id del socket

    //Unimos a los nuevos usuarios a la sala 'General'
    //No hay que crear las salas. Unimos los sockets a ellas directamente    
    socket.join("General")
})

//Dentro de las funciones 
function usuarioDesconectado(){
    console.log("Usuario desconectado:"+this.alias)

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
    
    //Comprobamos que el alias no esté repetido
    for(let a of aliasUsuarios){
        if(a == alias){
            this.emit("aliasRepetido","pues eso")
            return
        }
    }
    
    //Debemos asociar el alias al socket
    //aqui 'this' es el socket 
    this.alias = alias

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
    //io.emit("mensaje", mensaje)

    //Si queremos emitir un mensaje a los sockets que esten en una sala:
    //io.to('nombre_room').emit('mensaje', mensaje)

    let rooms = this.rooms
    for(let room of rooms){
        //Como no hemos sacado al socket de su sala personal evitamos el envíarle dos veces el mensaje
        if(room != this.id){
            io.to(room).emit('mensaje', mensaje)
        }
    }

}

function cambiarSala(sala){
    //Dentro de las funciones que añadimos con socket.on
    //'this' es el socket
    console.log("El usuario "+this.alias+" se cambia a la sala "+sala)

    //Comprobamos que la sala existe
    //Grán fajador:
    //let encontrado = false
    //for(let s of salas){
    //    if(s == sala){
    //        encontrado = true
    //        break
    //    }
    //}
    //if(!encontrado){
    //    console.log("La sala no existe!")
    //    return
    //}
    //Fino estilista:
    if(!salas.find( s => s==sala )){
        console.log("La sala no existe!")
        return
    }

    console.log(this.rooms)

    //Sacamos al socket de las salas en las que esté
    //Los sockets saben en que salas están
    let salasSocket = this.rooms
    for(let room of salasSocket){
        //Todos los sockets están por defecto en una sala cuyo nombre coincide con su identificador
        //No pasa nada si le sacamos de su sala personal, pero vamos a dejarla por que si
        if(room != this.id){
            this.leave(room)
            let mensaje = {
                alias : "Chat3000",
                texto : `----${this.alias} abandona la sala------------------------------`
            }
            io.to(room).emit("mensaje", JSON.stringify(mensaje))
        }
    }    
    
    //Unimos al socket a la nueva sala
    this.join(sala)

    //Avisamos a los usuarios de esa sala de que ha llegado otro    
    let mensaje = {
        alias : "Chat3000",
        texto : `----${this.alias} se ha unido a la sala '${sala}'------------------------------`
    }
    io.to(sala).emit("mensaje", JSON.stringify(mensaje))
    
    console.log(this.rooms)
}