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

    //Expresión regular
    // ^/discos/[0-9a-fA-F]{24}$
    //-debe comenzar por '/discos/
    //-debe continuar con 24 caracteres a escoger entre 0-9,a-f,A-F
    //-debe terminar ahí

    if( metodo=="GET" && url=="/discos" ){
        listar(request, response)
    } else if( metodo=="GET" && url.match("^/discos/[0-9a-fA-F]{24}$") ){
        buscarPorId(request, response)        
    } else if( metodo=="POST" && url=="/discos" ){
        insertar(request, response)  
    } else if( metodo=="PATCH" && url.match("^/discos/[0-9a-fA-F]{24}$") ){
        modificar(request, response)          
    } else if( metodo=="DELETE" && url.match("^/discos/[0-9a-fA-F]{24}$") ){
        borrar(request, response)  
    } else {
        //404!
        response.end("MAL")
    }
    
}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

/*
GET /discos
Aqui no hay qye extraer nada del request
*/
function listar(request, response){
    console.log("listando...")
    response.end("OK")
}

/*
GET /discos/:id
Aqui hay que extraer un valor de la URL
*/
function buscarPorId(request, response){

    let id = request.url.split("/")[2]
    console.log("buscando un disco por el id:"+id)
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

