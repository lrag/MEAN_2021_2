const fs = require('fs')

let certificado = null

exports.getCertificado = function(){
    if(!certificado){
        certificado = {
            key  : fs.readFileSync("./certificado/server.key"),
            cert : fs.readFileSync("./certificado/server.cert") 
        }
    }
    return certificado
}