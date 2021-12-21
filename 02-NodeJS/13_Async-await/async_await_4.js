const fs = require("fs/promises")

async function leerFicheroComoString(ruta){
    let buffer = await fs.readFile(ruta)
    return buffer.toString()
}

async function procesarFicheros(rutaFicheroDestino){
    try {
        let contenido1 = await leerFicheroComoString("./recursos/fichero1.txt")
        let contenido2 = await leerFicheroComoString("./recursos/fichero2.txt")
        let contenido3 = await leerFicheroComoString("./recursos/fichero3.txt")
        let contenido4 = contenido1+contenido2+contenido3
        fs.writeFile(rutaFicheroDestino, contenido4)
    } catch (err) {
        throw err
    }
}

procesarFicheros("./recursos/fichero4.txt")
//.then( () => console.log("YA") )
//.catch( err => console.log("ERROR")  )