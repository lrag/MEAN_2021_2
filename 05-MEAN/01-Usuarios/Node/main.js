const conf = require("./util/configUtil").conf
const mongoDBUtil = require("./bbdd/mongoDBUtil")
const http = require('http')
const express = require("express")

console.log("Inicializando...")

mongoDBUtil.conectarBBDD()


//console.log(conf.app_puerto)











