/*
npm install express
npm install mongoose
npm install jsonwebtoken
npm install validatorjs
*/

//Librerias
const http = require('http')
const https = require('https')
const certificadoUtil = require('./util/CertificadoUtil')
const express = require('express')
const mongoose = require('mongoose')

const interceptorJWT = require("./autenticacion/interceptorJWT").interceptorJWT

//Routers para express
const usuariosRouter = require("./rest/usuariosREST").router
const autenticacionRouter = require("./autenticacion/autenticacionRouter").router
const productosRouter = require("./rest/productosREST").router
const pedidosRouter = require("./rest/pedidosREST").router
const facturasRouter = require("./rest/facturasREST").router

//Primer paso: leer el fichero de configuracion
require("./util/configUtil")

//Segundo paso: conectar a la bbdd
mongoose.connect(process.env.url_bbdd) 
    .then(arrancarServidor)
    .catch(err => {
        console.log("No se pudo conectar con la base de datos.", err)
        process.exit(2)
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

    //Routers (despues de los interceptores!)
    app.use(autenticacionRouter)
    app.use(usuariosRouter)
    app.use(productosRouter)
    app.use(pedidosRouter)
    app.use(facturasRouter)

    //Para las imágenes de los productos
    app.use(express.static("./recursos"))

    //Arrancamos el servidor
    let certificado = certificadoUtil.getCertificado()
    https.createServer(certificado, app).listen(process.env.app_puerto, function(){
        console.log("Esperando peticiones en el puerto "+process.env.app_puerto+" (versión async-await)")
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

