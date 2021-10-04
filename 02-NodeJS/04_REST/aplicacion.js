const { SIGBREAK } = require("constants")
const { getFips } = require("crypto")
const http = require("http")

/*
API

Método  Url          Body    Respuesta  Funcionalidad
---------------------------------------------------------------
GET     /discos      -       [{json}]   listar todos los discos
GET     /discos/:id  -       {json}     buscar disco por id
POST    /discos      {json}  {json}     insertar un disco
PATCH   /discos/:id  {json}  {json}     modificar un disco
DELETE  /discos/:id  -       -          borrar un disco
*/

//////////////////////////////////////////////////////////////////
//CREAMOS, CONFIGURAMOS Y ARRANCAMOS EL SERVIDOR//////////////////
//////////////////////////////////////////////////////////////////

let servidor = http.createServer(procesarPeticion)
servidor.listen(3000, function(){
    console.log("Esperando peticiones en el puerto 3000")
})

//////////////////////////////////////////////////////////////////
//FUNCIÓN QUE PROCESARÁ TODAS LAS PETICIONES//////////////////////
//////////////////////////////////////////////////////////////////

function procesarPeticion(request, response){
    
    let metodo = request.method.toUpperCase()
    let url = request.url
    
    console.log("====================================")
    console.log(`Petición recibida ${metodo} ${url}`)
    
    if( metodo=="GET" && url=="/discos" ){
        listar(request, response)
    } else if( metodo=="GET" && url=="/discos/:id" ){
        buscarPorId(request, response)        
    } else if( metodo=="POST" && url=="/discos" ){
        insertar(request, response)  
    } else if( metodo=="PATCH" && url=="/discos/:id" ){
        modificar(request, response)          
    } else if( metodo=="DELETE" && url=="/discos/:id" ){
        borrar(request, response)  
    } else {
        //404!
    }
    
}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

function listar(request, response){
    console.log("listando...")
    response.end("OK")
}

function buscarPorId(request, response){
    console.log("buscando...")
    response.end("OK")
}

function insertar(request, response){
    console.log("insertando...")
    response.end("OK")
}

function modificar(request, response){
    console.log("modificando...")
    response.end("OK")
}

function borrar(request, response){
    console.log("borrando...")
    response.end("OK")
}

