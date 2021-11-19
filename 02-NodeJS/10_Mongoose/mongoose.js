//npm install mongoose
let mongoose = require("mongoose")

let urlBBDD = "mongodb://localhost:27017/tienda"

//Delegamos en mongoose el establecimiento de la conexión con el servidor de BB.DD.

console.log("Conectando con la base de datos")
mongoose
    .connect(urlBBDD)
    //.then( () => {
    //   pruebasMongoose() 
    //})
    .then(pruebasMongoose)
    .catch( err => console.log(err))

function pruebasMongoose(){

    //En Mongoose definimos los ESQUEMAS que se utilizaran en la base de datos
    //Para cada colección definiremos un objeto con sus propiedades
    //Y SUS TIPOS
    //-ObjectId
    //-String
    //-Number
    //-Date
    //-boolean
    //-buffer
    //-Object 
    //-Decimal128
    //-Array
    //-Map 

    //Pasos a seguir
    //-definir el esquema
    //-a partir del esquema crear el modelo
    //-una vez que tengamos el modelo ya podemos disfrutar de la comodidad que resulta
    //de que hagan las cosas por ti

    //Cuando creamos el esquema estamos definiendo como serán los documentos que van
    //a estar en una coleccion, pero no indicamos cuál colección es
    let esquemaUsuario = new mongoose.Schema({
        //Si queremos que sea el driver el que le de valor al _id
        //no lo añadiremos al esquema            
        //_id       : ObjectID,
        login: {
            type: String,
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
    //let Modelo = mongoose.model('nombre de la colección', esquema)
    //Cuando definimos el modelo indicamos el nombre de la colección
    //y nos olvidamos de ella para siempre   
    //
    //mongoose.model devuelve una función prototipo (o una clase)
    //si la invocamos con 'new' tendremos un hermoso objeto cuyas propiedades
    //son las definidas en el esquema y que además tiene una serie de
    //funciones relacionadas con la persistencia

    let Usuario = mongoose.model('usuarios', esquemaUsuario)

    //A partir de este momento cada vez que necesitemos un usuario hacemos el new del prototipo
    let usuario = new Usuario()

    //Como no le hemos pasado valores de momento solo tiene _id
    console.log(usuario)

    //El prototipo define unas cuantas funciones estupendas
    //for(let propiedad in usuario){
    //    console.log(propiedad)
    //}

    usuario.login     = "groucho"
    usuario.password  = "1234567890"
    usuario.nombre    = "GRoucho"
    usuario.direccion = "C/Tal"

    //Nadie nos impide añadirle propiedades que no están en el esquema, pero
    //luego mongoose las ignorará
    usuario.trololo = "lololo"   
    
    console.log(usuario)    

    /////////////////////////
    //INSERTAR UN DOCUMENTO//
    /////////////////////////  
    
    //La llamada a 'save' inserta el objeto en la colección correspondiente
    //Save es asíncrono y funciona con callbacks y promesas
    //Una vez insertado nos proporcionan el objeto tal cual haya quedado
    //en la base de datos

    //Cuidado! Debemos asegurarnos de que el objeto no tiene null como valor de _id
    //antes del save si queremos que nos devuelvan el _id generado por mongoDB     

    console.log("Insertando el usuario...")
    usuario.save()
        .then(usuarioInsertado => {
            console.log("Usuario insertado")

            let usrNormalYCorriente = {
                login     : 'douglasquaid',
                password  : '1234567890',
                nombre    : 'Douglas Quaid',
                direccion : 'Marte',
                //Esta propiedad no está en el esquema que hemos definido y se ignorará
                TOCOTO    : 'ARSA'
            }
            let usuario2 = new Usuario(usrNormalYCorriente)            
            return usuario2.save()
        })
        .then( usuarioInsertado => {
            console.log("Usuario2 insertado")
        })
        .catch( err => {
            console.log(err)
        }) 

}
