console.log("Inicializando...")

//Librerías
const http = require('http')
const express = require("express")
//Librerías 'nuestras'
const mongoDBUtil = require("./bbdd/mongoDBUtil")

//Primer paso: leer el fichero de configuración
require("./util/configUtil")

//Segundo paso: conectar con la base de datos
mongoDBUtil.conectarBBDD()














