//Guardamos el esquema en esta variable
let esquema

function conectar(){
    return new Promise(function(resolve, reject){
        console.log("Conectando con la aplicacion MongoDB Realm...")

        //Obtenemos un objeto que representa a la aplicación que corre en los servidores de MongoDB
        //tenemos que utilizar el identificador único que le haya correspondido
        const app = new Realm.App({ id: "agenda-nifxu" })

        //Nos autenticamos como usuario anónimo
        //Creamos unas credenciales
        let credenciales = Realm.Credentials.anonymous()
        app.logIn(credenciales)
            .then( usuario => {
                console.log(usuario)
                //Utilizaremos el usuario para obtener una 'conexión' a la bb.dd que está en Atlas
                const mongo = usuario.mongoClient("mongodb-atlas")
                //Obtenemos el esquema
                esquema = mongo.db("bbdd_agenda")
                resolve()
            })
            .catch( err => reject(err))
    })
}

function listarContactos(){
    esquema
        .collection("contactos")
        .find() //En RealmWeb find no devuelvle un cursor sino la promesa de la query
        //.toArray()
        .then(rellenarTablaContactos)
        .catch( err => console.log(err))
}

function rellenarTablaContactos(contactos){
    console.log(contactos)
}

$(inicializar)
function inicializar(){
    console.log("inicializando...")

    conectar() 
        .then( () => {
            listarContactos()
        })
        .catch( err => console.log(err)) 
}