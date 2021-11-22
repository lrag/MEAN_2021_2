//npm install mongoose
let mongoose = require("mongoose")

let urlBBDD = "mongodb://localhost:27017/mongoose"

console.log("Conectando con la base de datos")
mongoose
    .connect(urlBBDD)
    .then(pruebasMongoose)
    .catch( err => console.log(err))

function pruebasMongoose(){

    //Esquema
    let esquemaUsuario = new mongoose.Schema({
        //Si queremos que sea el driver el que le de valor al _id
        //no lo añadiremos al esquema            
        //_id       : ObjectID,
        login: {
            type    : String,
            required: true
        },
        password  : String,
        rol       : String,
        nombre    : String,
        direccion : String,
        telefono  : String,
        correoE   : String,
        idioma    : String        
    })

    //Creamos el modelo
    let Usuario = mongoose.model('usuarios', esquemaUsuario)

    //Objeto
    let usuario = new Usuario()
    console.log(usuario)
    usuario.login     = "chico"
    usuario.password  = "1234567890"
    usuario.nombre    = "Chico"
    usuario.direccion = "C/Tal"
    
    console.log(usuario)    

    console.log("Insertando el usuario...")
    usuario.save()
        .then(usuarioInsertado => {
            console.log("Usuario insertado")

            let usrNormalYCorriente = {
                login     : 'johnmcclane',
                password  : '1234567890',
                nombre    : 'John McClane',
                direccion : 'NYC',
            }
            let usuario2 = new Usuario(usrNormalYCorriente)            
            return usuario2.save()
        })
        .then( usuarioInsertado => {
            console.log("Usuario2 insertado")
            return Usuario.findById("619b52ac79600e9686e1214c")
        })
        .then( usuarioEncontrado => {
            if(!usuarioEncontrado){
                console.log("El usuario no existe")
                return
            }
            console.log("Usuario encontrado:", usuarioEncontrado)
        } )
        .catch( err => {
            console.log(err)
        }) 

}
