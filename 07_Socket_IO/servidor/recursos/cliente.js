//Con esta variable referenciaremos al socket
let socket = null

function conectar(){

    let alias = $("#alias").val()
    if(alias.trim().length == 0){
        alert("Por favor introduzca el alias")
        return 
    }

    //La librería nos da el objeto 'io'
    //La función connect es síncrona
    //Devuelve un socket, pero que todavía no está establecido puesto
    //que conectar en realidad es una tarea asíncrona    
 
    socket = io.connect(
        "http://localhost:8000", 
        {
            //forceNew     : true,
            //reconnection : false
        } 
    )

    //Con el evento 'connect' nos enteramos de que la conexión se ha establecido
    socket.on("connect", conexionEstablecida)

}

function conexionEstablecida(){
    modoConectado()
    //Enviamos el alias
    //Los mensajes tienen solo dos valores:
    //-nombre del mensaje (string)
    //-valor del mensaje (string)
    let alias = $("#alias").val()
    socket.emit("alias", alias)
}

function desconectar(){
    socket.disconnect() //Esta función es asíncrona
    modoDesconectado()
}

function enviarMensaje(){
    let texto = $("#mensaje").val()
    if(texto.trim().length == 0){
        return
    }
    socket.emit("mensaje", texto)
}

function modoDesconectado(){
    $("#btnConectar").prop("disabled",false)
    $("#alias").prop("disabled",false)

    $("#btnDesconectar").prop("disabled",true)
    $("#btnEnviar").prop("disabled",true)
    $("#mensaje").prop("disabled",true)
}

function modoConectado(){
    $("#btnConectar").prop("disabled",true)
    $("#alias").prop("disabled",true)

    $("#btnDesconectar").prop("disabled",false)
    $("#btnEnviar").prop("disabled",false)
    $("#mensaje").prop("disabled",false)
}

$(inicializar)
function inicializar(){
    console.log("inicializando...")

    $("#btnConectar").click(conectar)
    $("#btnDesconectar").click(desconectar)
    $("#btnEnviar").click(enviarMensaje)

    modoDesconectado()
}