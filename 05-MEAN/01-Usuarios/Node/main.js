//Librerias
const http = require('http')
const express = require('express')
//Librerías 'nuestras'//////////////////////////////////////
const mongoUtil = require("./bbdd/mongoDBUtil")

const interceptorJWT = require("./autenticacion/interceptorJWT").interceptorJWT

//Routers para express
const usuariosRouter = require("./rest/usuariosREST").router
const autenticacionRouter = require("./autenticacion/autenticacionRouter").router

//Primer paso: leer el fichero de configuracion
require("./util/configUtil")

//Segundo paso: conectar a la bbdd
//aqui cojo la promesa que se ha programado en mongoUtil
mongoUtil.conectarBBDD()
//aqui me traigo el then y el catch del archivo, lo paso aqui
    .then(function(){
        //esto es el resolve que mando desde desde mongoUtil
        //Tercer paso: arrancar el servidor
        arrancarServidor()
        //lo que sale de aqui es lo q entra en la funcion de la promesa del resolve del archivo MongoDBUtil
    })
    .catch(function(){
        process.exit(2)
        //lo que sale de aqui es lo que entra en reject del archivo MongoDBUtil
    })
    
function arrancarServidor(){
    console.log("Arrancando el servidor...")

    let app = express()

    //Interceptores (en express los llaman middleware)
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
    }))       

    app.use(interceptorLog)
    app.use(interceptorCORS)
    app.use(interceptorJWT)

    //Routers
    app.use(autenticacionRouter)
    app.use(usuariosRouter)

    //Arrancamos el puerto
    http.createServer(app).listen(process.env.app_puerto, function(){
        console.log("Esperando peticiones en el puerto "+process.env.app_puerto)
    })
    
}

////////////////////////////////////////////////////////////////////
//MIDDLEWARE. Funciones interceptoras///////////////////////////////
////////////////////////////////////////////////////////////////////

function interceptorLog(request, response, next){
    console.log("==============================================")
    console.log("Peticion recibida: "+request.method+" "+request.url)
    next()
}

function interceptorCORS(request, response, next){
    console.log("----------------------------------------------")
    console.log("Interceptor CORS")
    //Cross Origin Resource Sharing
    //Vamos a añadir estos headers a todas las respuestas que demos, sean options o no:
    response.setHeader("Access-Control-Allow-Origin", "*")
    response.setHeader('Access-Control-Allow-Methods', 
                    'GET,PUT,POST,DELETE,PATCH,OPTIONS')
    response.setHeader("Access-Control-Allow-Headers", 
                    "Origin, X-Requested-With, Content-Type, Accept, Authorization")  
    
    if(request.method.toUpperCase()=="OPTIONS"){
        response.end()
        return
    } 

    next()
}

