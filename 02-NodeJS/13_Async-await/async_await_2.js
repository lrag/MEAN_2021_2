const fs = require("fs/promises")

function concatenarFicheros(){

    return new Promise(function(resolve, reject){
        fs.readFile("./recursos/fichero1.txt")
        .then(function(contenido){
            contenido1 = contenido.toString()
            return fs.readFile("./recursos/fichero2.txt")
        })
        .then(function(contenido){
            contenido2 = contenido.toString()
            return fs.readFile("./recursos/fichero3.txt")
        })
        .then(function(contenido){
            let contenido3 = contenido.toString()
            let contenido4 = contenido1+contenido2+contenido3
            return fs.writeFile("./recursos/fichero4.txt",contenido4)
        })
        .then(function(){
           resolve()
        })
        .catch(function(err){
            reject(err)
        })

    })
}

//concatenarFicheros()
//    .then( () => console.log("FIN"))
//    .catch( err => console.log(err))

async function concatenarFicherosAsyncAwait(){
    try {
        let contenido1 = await fs.readFile("./recursos/fichero1.txt")
        let contenido2 = await fs.readFile("./recursos/fichero22222.txt")
        let contenido3 = await fs.readFile("./recursos/fichero3.txt")
        let contenido4 = contenido1.toString() + contenido2.toString() + contenido3.toString()
        await fs.writeFile("./recursos/fichero4.txt",contenido4)
        console.log("Fichero4 creado")
    } catch( error){
        console.log("ZASCA!!!!") //,error.message)
        throw new Error("No se pudo crear el fichero4 porque bla bla blá")
    }
}

concatenarFicherosAsyncAwait()
.then( () => {
    console.log("Siguiente tarea, relacionada con el fichero4")
})
.catch( err => console.log(err))

