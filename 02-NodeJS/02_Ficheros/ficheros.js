//Este modulo viene por defecto con Node.JS
const fs = require("fs")


//////////////////////////////////
// LECTURA SÍNCRONA DE FICHEROS //
//////////////////////////////////

//Las rutas relativas en node son desde el directorio en el que se encuentra
//el fichero JS que se está ejecutando
//
//Cuidado que readFileSync lee del tirón todo el fichero y lo mete en la memoria!
//Lo usaremos solo cuando los ficheros no sean enormes
//let contenido1 = fs.readFileSync("./recursos/fichero1.txt")
//let contenido2 = fs.readFileSync("./recursos/fichero2.txt")
//let contenido3 = fs.readFileSync("./recursos/fichero3.txt")

//contenido es un buffer de bytes
//console.log(contenido1)
//Si queremos convertirlo en un string:
//console.log(contenido1.toString());
//let txt4 = contenido1.toString()+contenido2.toString()+contenido3.toString()
//console.log(txt4)

////////////////////////////////////
// ESCRITURA SÍNCRONA DE FICHEROS //
////////////////////////////////////

//fs.writeFileSync(ruta_al_fichero, contenido)
//fs.writeFileSync("./recursos/fichero4.txt", txt4)

///////////////////////////////////
// LECTURA ASÍNCRONA DE FICHEROS //
///////////////////////////////////

//fs.readFile(ruta_al_fichero, callback)

//let contenido = fs.readFile("./recursos/fichero1.txt", function(error, contenido){
//    console.log(contenido.toString())
//})
////Una función asíncrona jamás devolverá el fruto de su trabajo
//console.log(contenido) //undefined

//let contenidoFichero1 = null
//let contenidoFichero2 = null
//let contenidoFichero3 = null

//Si lo hacemos así se leen los tres ficheros en paralelo, no nos garantiza el orden
//y encima no podemos acceder al valor del contenido con las variables declaradas arriba
/*
fs.readFile("./recursos/fichero1.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero1 = contenido.toString()   
})

fs.readFile("./recursos/fichero2.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero2 = contenido.toString()    
})

fs.readFile("./recursos/fichero3.txt", function(error, contenido){
    console.log(contenido.toString())
    contenidoFichero3 = contenido.toString()    
})
*/

//No podemos hacer una espera activa
//De este bucle no se saldrá JAMÁS
//while(contenidoFichero1 == null){
    //nada, esperar
//}
//console.log(contenidoFichero1) 


//                                                    //
// CONCATENANDO LLAMADAS ASINCRONAS CON CALLBACK HELL //
//                                                    //

fs.readFile("./recursos/fichero1.txt", function(error, contenido){
    if(error){
        console.log("Error!",error)
        return
    }    
    let contenidoFichero1 = contenido.toString()   

    fs.readFile("./recursos/fichero2.txt", function(error, contenido){
        if(error){
            console.log("Error!",error)
            return
        }  
        let contenidoFichero2 = contenido.toString()    

        fs.readFile("./recursos/fichero3.txt", function(error, contenido){
            if(error){
                console.log("Error!",error)
                return
            }              
            let contenidoFichero3 = contenido.toString()    
            let contenidoFichero4 = contenidoFichero1+contenidoFichero2+contenidoFichero3

            fs.writeFile("./recursos/fichero4.txt", contenidoFichero4, function(error){
                if(error){
                    console.log("Error!",error)
                    return
                }                   
                console.log("FIN")
                
            }) //escribir el resultado

        }) //leer el tercer fichero

    }) //leer el segundo fichero
    
}) //leer el primer fichero

console.log("FIN en falso")


