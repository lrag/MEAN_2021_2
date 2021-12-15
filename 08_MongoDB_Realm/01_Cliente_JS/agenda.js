
function conectar(){

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
        })
        .catch( err => console.log(err))


}

$(inicializar)
function inicializar(){
    console.log("inicializando...")

    conectar()    
}