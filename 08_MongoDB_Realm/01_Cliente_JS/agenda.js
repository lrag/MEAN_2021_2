//Guardamos el esquema en esta variable
let esquema

//Aqui guardamos el id del contacto seleccionado
let idContactoSel

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

function seleccionarContacto(idContacto){
    console.log("Seleccionar:"+idContacto)
    idContactoSel = idContacto

    esquema
        .collection("contactos")
        .findOne({ _id : idContacto })
        .then( contacto => {
            if(!contacto){
                mostrarError("El contacto no existe")
                return
            }
            for(let propiedad in contacto){
                $("#"+propiedad).val(contacto[propiedad])
            }
            modoSeleccion()
        })
        .catch(err => console.log(err))
}

function insertarContacto(){

    let contacto = {}
    $("#formulario [campo]").each(function(pos, nodo){
        contacto[nodo.id]=nodo.value
    })
    console.log(contacto)

    esquema
        .collection("contactos")
        .insertOne(contacto)
        .then( X => {
            console.log(X)  
            listarContactos()  
            vaciarFormulario()
        })
        .catch(err => console.log(err))
}


function modificarContacto(){

    console.log("////MODIFICAR///////////////////////////")
    let contacto = {}
    $("#formulario [campo]").each( (pos, nodo) => {
        contacto[nodo.id] = nodo.value
    })

    esquema
        .collection("contactos")
        .findOneAndUpdate(
            { _id : idContactoSel },
            { $set : contacto }
        )
        .then( rs => {
            console.log(rs)
            //Comprobamos que se ha modificado un documento
            if(!rs){
                mostrarError("No existe el contacto")
            }
            vaciarFormulario()
            modoInsercion()
            listarContactos()
        })
        .catch( error => console.log(error) )
}

function borrarContacto(){
    esquema
        .collection("contactos")
        .deleteOne( { _id : idContactoSel })
        .then( rs => {
            console.log(rs)
            //Comprobamos que se ha borrado un documento
            if(rs.deletedCount!=1){
                mostrarError("No existe el contacto")
            }
            vaciarFormulario()
            listarContactos()
        })
        .catch( error => console.log(error) )
}

function rellenarTablaContactos(contactos){
    console.log(contactos)

    $("#tablaContactos").html('')
    $(contactos).each(function(pos, contacto){
        $(`<tr>
                <td>${contacto.nombre}</td>
                <td>${contacto.direccion}</td>
                <td>${contacto.telefono}</td>
                <td>${contacto.correoE}</td>
           </tr>`)
        .click(function (e){
            seleccionarContacto(contacto._id)
        })        
        .appendTo("#tablaContactos")
    })   
}

function mostrarError(mensaje){
    $("#alertError").css("display","block")
    $("#mensajeError").html(mensaje)
}

function vaciarFormulario(){
    //esto solo funciona para cajas de texto, textareas y selects
    $("#formulario [campo]").val('')
    //Borramos el id guardado
    idContactoSel = null
    modoInsercion()
}

function modoInsercion(){
    $("#btnBorrar").prop("disabled", true )
    $("#btnModificar").prop("disabled", true )
    $("#btnInsertar").prop("disabled", false )
}

function modoSeleccion(){
    $("#btnBorrar").prop("disabled", false )
    $("#btnModificar").prop("disabled", false )
    $("#btnInsertar").prop("disabled", true )
}

$(inicializar)
function inicializar(){
    console.log("inicializando...")

    $("#btnInsertar").click(insertarContacto)
    $("#btnModificar").click(modificarContacto)
    $("#btnBorrar").click(borrarContacto)
    $("#btnVaciar").click(vaciarFormulario)

    $("#alertError").css("display","none")

    modoInsercion()
    conectar() 
        .then( () => {
            listarContactos()
        })
        .catch( err => console.log(err)) 
}