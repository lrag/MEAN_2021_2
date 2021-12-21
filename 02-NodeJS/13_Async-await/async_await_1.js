const fs = require("fs/promises")

async function tareaAsincrona(){

    //let contenido1 = fs.readFile("./recursos/fichero1.txt")
    //console.log(contenido1) //Esto no es el contenido!!

    //let contenido1 = null
    //fs.readFile("./recursos/fichero1.txt")
    //    .then( contenido => contenido1 = contenido )
    //console.log(contenido1) //NULL!


    let contenido1 = await fs.readFile("./recursos/fichero1.txt")
    
    //Aunque aqui estemos devolviendo el contenido del fichero la funcion 
    //devolverá la promesa de este valor
    return contenido1

}

//let contenido = tareaAsincrona()
//console.log(contenido) //PROMESA

tareaAsincrona()
.then( contenido => {
    console.log(contenido.toString())
})
.catch( err => console.log(err))