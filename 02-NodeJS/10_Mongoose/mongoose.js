//npm install mongoose
let mongoose = require("mongoose")

let urlBBDD = "mongodb://localhost:27017/mongoose"

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

    usuario.login     = "harpo"
    usuario.password  = "1234567890"
    usuario.nombre    = "Harpo"
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
                login     : 'harrycallahan',
                password  : '1234567890',
                nombre    : 'Harry Callahan',
                direccion : 'S.F.',
                //Esta propiedad no está en el esquema que hemos definido y se ignorará
                TOCOTO    : 'ARSA'
            }
            let usuario2 = new Usuario(usrNormalYCorriente)            
            return usuario2.save()
        })
        .then( usuarioInsertado => {
            console.log("Usuario2 insertado")

            ////////////////////
            //BÚSQUEDA POR _ID//
            ////////////////////  
            
            //Para buscar documentos utilizamos directamente el modelo

            //Si el _id es ObjectId mongoose hace automáticamente la conversión de string a ObjectId
            //Usuario.findOne({ _id : new ObjectId("619b52ac79600e9686e1214c")})
            //Usuario.find({ ciudad : "Chinchón" }) //un array con los usuarios que son de Chinchón
            return Usuario.findById("619b52ac79600e9686e1214a")
        })
        .then( usuarioEncontrado => {
            if(!usuarioEncontrado){
                console.log("El usuario no existe")
                return
            }

            console.log("Usuario encontrado:", usuarioEncontrado)

            //////////
            //BORRAR//
            //////////  
            
            //Podemos hacerlo en dos fases:
            //-buscar el objeto
            //-pedirle que se borre   
            /*         
            Usuario.findById("619b56007e18fada98600631")
            .then( usrEncontrado => {
                console.log("Borrar:", usrEncontrado)
                return usrEncontrado.deleteOne()
            })
            .then(resultado => {
                console.log("Usuario borrado.")
            })
            .catch(err => console.log(err))
            */

            //Tambien podemos utilizar directamente el modelo para borrar en una única consulta
            return Usuario.findByIdAndRemove("619b57fcf4616c36892d36ce")
        } )
        .then( resultado => {
            console.log("Usuario borrado")

            /////////////
            //MODIFICAR//
            /////////////

            //Podemos buscar el objeto, cambiarle los valores y modificarlo (dos consultas)
            /*
            Usuario.findById("619b59cff64461ef4abd73e8")
            .then( usuarioEncontrado => {
                console.log("=======================================================")
                console.log(usuarioEncontrado)
                usuarioEncontrado.telefono = "555 654 321"
                //save si el objeto tiene un valor en _id que existe en la colección MODIFICA
                return usuarioEncontrado.save()
            })
            .then(x => {
                console.log("Usuario modificado")
            })
            .catch( error => console.log(error) )
            */
           
            //Podemos modificar directamente utilizando el modelo(una única consulta)
            return Usuario.findByIdAndUpdate("619b59cff64461ef4abd73e8", { correoE : "harrycallahan@sfpd.com" } )
        })
        .then( resultado => {
            console.log("Usuario modificado")
        })
        .catch( err => {
            console.log(err)
        }) 

}
