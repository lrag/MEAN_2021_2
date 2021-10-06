const http = require("http")

const negocioDiscos = require("./negocioDiscos.js") //La extensión 'js' es opcional

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
    } else if( metodo=="POST" && url=="/hasta_luego_lucas" ){
        console.log("Adiós mundo cruel!")
        process.exit(0)  
    } else {
        //404!
        response.end("MAL")
    }
    
}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

/*
Las tareas de la lógica de control en un api REST son las siguientes:

-Extraer de la petición los valores necesarios
    -query parameters
    -parámetros interpolados en la ruta
    -contenido del body
    -valores en los headers
    -cualquier combinación de los anteriores

-Invocar la función con la lógica de negocio

-Componer y entregar la respuesta

-Y YA!
*/

/*
GET /discos
*/
function listar(request, response){
    //Aqui no hay que extraer nada del request
    console.log("listando...")
    response.end("OK")
}

/*
GET /discos/:id
*/
function buscarPorId(request, response){    
    //Aqui hay que extraer un valor de la URL
    let id = request.url.split("/")[2]
    console.log("buscando un disco por el id:"+id)

}

/*
POST /discos
CT: app/json
------------
{ disco }
*/
function insertar(request, response){
    console.log("insertando...")
    //Leemos el body con request.on()
    //'on' es asíncrona y recibe dos parámetros:
    //-el evento
    //-el callback 

    //Si no llamamos a on con "data" el body no se leerá
    request.on("data", function(contenidoBody){     
        let disco = JSON.parse(contenidoBody)
        console.log("Body:",contenidoBody.toString())
        console.log("Body:",disco)

        //llamadita a la lógica de negocio

        response.end("OK (que no se me olvide quitar este response.end)")
    })

}

/*
PATCH /discos/:id
CT: app/json
------------
{ disco }
*/
function modificar(request, response){

    //Tenemos que leer el body y sacar el id de la url
    let id = request.url.split("/")[2]
    request.on("data", function(contenidoBody){     
        let disco = JSON.parse(contenidoBody)
        console.log("Body:",contenidoBody.toString())
        console.log("Body:",disco)

        response.end("OK (que no se me olvide quitar este response.end)")
    })

    console.log("modificando...")
    response.end("OK")
}

/*
DELETE /discos/:id
*/
function borrar(request, response){
    console.log("borrando...")

    //Tenemos que el id de la url
    let id = request.url.split("/")[2]


}


