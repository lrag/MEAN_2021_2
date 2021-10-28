const fs = require("fs")

console.log("Leyendo la configuracion...")

let buffer = fs.readFileSync("conf.json")
let json = buffer.toString()
let conf = JSON.parse(json)

exports.conf = conf





