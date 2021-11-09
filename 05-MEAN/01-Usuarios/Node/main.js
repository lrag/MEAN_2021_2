console.log("Inicializando...")

//Librerías/////////////////////////////////////////////////
const http = require('http')
const express = require("express")
//Librerías 'nuestras'//////////////////////////////////////
const mongoDBUtil = require("./bbdd/mongoDBUtil")
//Routers para express//////////////////////////////////////
const usuariosRouter = require("./rest/usuariosREST").router

//Primer paso: leer el fichero de configuración/////////////
require("./util/configUtil")

//Segundo paso: conectar con la base de datos///////////////
mongoDBUtil
    .conectarBBDD()
    .then(function(){
        //Tercer paso: arrancar el servidor/////////////////
        arrancarServidor()
    })
    .catch(function(){
        console.log("Parando la aplicacion...")
        process.exit(2)
    })

function arrancarServidor(){
    console.log("Arrancando el servidor...")

    let app = express()

    //middleware
    app.use(express.json({
        limit: '5mb' //Tamaño máximo del body que estamos dispuestos a leer. IMPRESCINDIBLE
    }))       

    //Routers
    app.use(usuariosRouter)

    http.createServer(app).listen(process.env.app_puerto, function(){
        console.log("Esperando peticiones en el puerto "+process.env.app_puerto)
    })

}










