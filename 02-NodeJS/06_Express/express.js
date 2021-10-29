//npm install express
const express = require("express")

//Cuando invocamos la funcion express nos devueven un objeto del tipo función
//Esa es la función que procesará todas las peticiones entrantes
let app = express()

//El objeto 'app' es la función que se le proporciona al servidor cuando se invoca 'createServer'
const http = require("http") //Express ya incluye este require
//http
//    .createServer(app)
//    .listen(4000, function(){
//        console.log("Esperando peticiones en el puerto 4000")
//    })

//
//Indicando el puerto y arrancando el servidor directamente con express
//
app.listen(4000, function(){
    console.log("Esperando peticiones en el puerto 4000")
})

//////////////////////////
// CONFIGURANDO EXPRESS //
//////////////////////////

//URLS Y METODOS

app.get("/saludar", saludar)
app.post("/discos", insertarDisco)

function saludar(request, response){
    response.end("Hola que tal!")
}

function insertarDisco(request, response){
    response.end("Disco insertado!")
}

//Podemos definir el callback en la propia llamada a get, post, put...
//Pero QUEDA FEISIMO!
app.get('/pagina', function(request, response){
    let html = `
        <html>
            <body>
                <marquee>
                    <h1>Html generado dinamicamente con Node.JS + Express</h1>
                </marquee>
            </body>
        </html>`;
    response.setHeader('Content-type', 'text/html')
    response.end(html)
})

//
//Accediendo a los query params ?
//
//get /peliculas?genero=accion&year=1989&actor=Bruce Willis
//request.query = {
//  genero : "accion",
//  year   : "1988",
//  actor  : "Bruce Willis"
//}
app.get("/peliculas", listarPeliculas)

function listarPeliculas(request, response){
    console.log("Listar peliculas")
    console.log("Query params:",request.query)
    console.log("Genero      :"+request.query.genero)
    console.log("Año         :"+request.query.year)
    console.log("Actor       :"+request.query.actor)
    response.end("Listado de películas del actor "+request.query["actor"])
}

//
//Accediendo a los valores contenidos en la ruta
//
//Las partes variables en la url las indicaremos con ':'
//Express se monta sus expresiones regulares para saber si la url coincide o no
//get /clientes/15
//request.params = {
//  id : "15"
//}
app.get("/clientes/:id", buscarCliente)

function buscarCliente(request, response){
    //Express añade al request una propiedad llamada 'params'
    //En ella hay un objeto cuyas propiedades son los parámetros incluidos en la URL    
    console.log("params :",request.params)
    console.log("id     :"+request.params.id)
    response.end("Datos del cliente "+request.params.id)
}

//Podemos indicar más de un parámetro en la url
//GET /movida/:dato1/tocoto/:dato2
//GET /movida/abc/tocoto/123
//request.params = {
//  dato1 : "abc",
//  dato2 : "123",
//}
app.get("/movida/:dato1/tocoto/:dato2", procesarMovida)

function procesarMovida(request, response){
    console.log("Procesando una movida gordísma con los datos: "+request.params.dato1+" y "+request.params.dato2)
    response.end("OK")
}

//
//Devolviendo un JSON
//
app.get("/coches/:id", buscarCoche)

function buscarCoche(request, response){

    let coche = {
        marca : "FIAT",
        modelo : "Uno 45s"
    }

    //Sin express
    //response.setHeader("Content-type", "application/json")
    //response.end(JSON.stringify(coche))

    //Con express
    response.json(coche)
}

//
//Accediendo al body
//

//Si queremos que express lea el body debemos registrar un objeto capaz de procesarlo
//Esos objetos se llaman 'bodyParsers'
//De serie vienen tres:
//JSON bodyParser: 
//      Lee del body un JSON y lo transforma en objetos JS
//      Accedemos a él con request.body
//      Solo hace su trabajo si en la petición viene el header 'Content-Type : application/json'
//Url encoded form body parser:
//      Se usa cuando esperamos parámetros dentro del body.
//      Luego accederemos a ellos con request.query
//Text body parser:
//      El más sencillo de todos. Lee el body y lo deja tal cual, como una cadena 
//      de texto en request.body
//
//Se puede indicar más de un bodyParser y express usará el que corresponda dependiendo
//del Content-Type de la petición

//Tenemos que hacer el require. Este módulo está ya incluido en express, no hace falta descargarlo con NPM
//let bodyParser = require("body-parser") //Ya viene incluido cuando hacemos npm install express
//invocamos json()
//let jsonBodyParser = bodyParser.json()
//Registramos el body parser
//app.use(jsonBodyParser)

//Desde la versión 4 de express se hace así:
app.use(express.json({
    limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
}))

//Si fueramos a recibir también parámetros
app.use(express.urlencoded({ extended: true }))

app.put("/aviones/:id", modificarAvion)
function modificarAvion(request, response){
    let idAvion = request.params.id
    let avion = request.body
    console.log("Avion:", avion)
    console.log(avion.fabricante)
    console.log(avion.modelo)
    response.end("Modificado!")
}

//
//Sirviendo contenido estático
//

//De momento hemos definido estas peticiones:
//app.get('/saludar', saludar)
//app.post('/discos', insertarDisco)
//app.get('/pagina', function(request, response)
//app.get('/peliculas', listarPeliculas)
//app.get("/clientes/:id", buscarCliente)
//app.get("/movida/:dato1/tocoto/:dato2", procesarMovida)
//app.get("/coches/:id", buscarCoche)
//app.put("/aviones/:id", modificarAvion)
//
//Cuando llega una peticion express compara el método y la url con las
//distintas peticiones que hemos definido. Si no coincide con ninguna de ellas
//hace un último intento dentro de la carpeta 'recuros' si añadimos use express.static:

//Si no lo encuentra ya se devuelve un 404
app.use(express.static("./recursos"))


//
//Definiendo el 'HOME'
//
app.get("/", home)
function home(request, response){
    //express añade la función 'sendFile' a response

    //Debemos indicar la ruta ABSOLUTA
    //Dirname es una variable implícita (que solo tenemos en node) en la
    //que se guarda la ruta absoluta al raíz de la aplicacion
    //console.log(__dirname) 
    response.sendFile(__dirname+"/recursos/agenda.html")
}

//Quitando la 'publicidad'
//Express añade por defecto a todas las respuestas el header 'X-Powered-By: Express'
//Cuantas menos indicaciones demos a posibles atacantes MEJOR
app.disable('x-powered-by')



