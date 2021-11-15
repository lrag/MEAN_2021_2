const http = require("http")
const express = require("express")

arrancarServidor()

function arrancarServidor(){

    console.log("Arrancando el servidor HTTP")
    
    let app = express()

    //Cadena de interceptores
    app.use(interceptorLog)
    app.use(interceptorCORS)
    app.use(interceptorAutenticacion)

    app.get("/discos", listar)
    app.get("/discos/:id", buscarPorId)
    app.post("/discos", insertar)
    app.patch("/discos/:id", modificar)
    app.delete("/discos/:id", borrar)

    app.listen(5000, function(){
        console.log("Esperando peticiones en el puerto 5000")
    })

}

//////////////////////////////////////////////////////////////////
//MIDDLEWARE. Funciones interceptoras/////////////////////////////
//////////////////////////////////////////////////////////////////

function interceptorLog(request, response, next){
    console.log("=================================================")
    console.log(`Peticion ${request.method} ${request.url} recibidia. ${new Date()}`)
    //...
    next()
}

function interceptorCORS(request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Añadiendo las cabeceras content-policy`)
    //...
    next()
}

function interceptorAutenticacion(request, response, next){
    console.log("-------------------------------------------------")
    console.log(`Comprobando que la petición es de un usuario autenticado`)
    //Si un interceptor decide no invocar 'next' deberá proporcionar una respuesta
    next()
}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

function listar(request, response){
    console.log("listando...")
    response.json([{ id:1, titulo:"TDSOTM", grupo:"Pink Floyd"},{ id:2, titulo:"IV", grupo:"Led Zeppelin"},{ id:3, titulo:"For those about to rock", grupo:"AC/DC"}])
}

function buscarPorId(request, response){ 
    let id = request.params.id   
    console.log("buscando un disco por el id:"+id)
    response.json({ id:id, titulo:"IV", grupo:"Led Zeppelin"})
}

function insertar(request, response){
    console.log("Insertando...")
    response.status(201).json({ codigo:201, mensaje:"Disco insertado"} )
}

function modificar(request, response){
    console.log("Modificando...")
    response.json({ codigo:200, mensaje:"Disco modificado"} )
}

function borrar(request, response){
    console.log("Borrando...")
    response.json({ codigo:200, mensaje:"Disco eliminado"} )    
}

