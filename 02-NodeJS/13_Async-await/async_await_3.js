const fs = require("fs/promises")

function leerFicheroComoString1(ruta){
    return new Promise(function(resolve, reject){
        fs.readFile(ruta) 
        .then( buffer => {
            resolve(buffer.toString())
        }) 
        .catch( err => reject(err))
    })
}

async function leerFicheroComoString2(ruta){
    let buffer = await fs.readFile(ruta)
    return buffer.toString()
}

leerFicheroComoString1("./recursos/fichero1.txt")
.then( contenido => {
    console.log("---------------------------------------")
    console.log(contenido)
})
.catch( err => console.log(err))

leerFicheroComoString2("./recursos/fichero1.txt")
.then( contenido => {
    console.log("---------------------------------------")
    console.log(contenido)
})
.catch( err => console.log(err))