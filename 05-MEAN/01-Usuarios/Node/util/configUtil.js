const fs = require("fs")

console.log("Leyendo la configuracion...")

try {
    //__dirname es una variable implícita que guarda la ruta absoluta al fichero en el que estamos
    let buffer = fs.readFileSync(__dirname+"\\..\\conf.json")
    let json = buffer.toString()
    let conf = JSON.parse(json)
    //Colocamos en process.env las propiedades que tiene el objeto 'conf'
    for(let propiedad in conf){
        process.env[propiedad] = conf[propiedad]
    }
} catch(error){
    console.log("Error leyendo el fichero de configuración:", error.message)
    process.exit(1)
}

console.log("Configuración leída")
