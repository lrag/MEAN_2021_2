
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
    
    
    //
    //CUIDADO CON ESTE LET, LUIS RAMÓN
    //    
    let socket = io.connect(
        "http://localhost:8000", 
        {
            forceNew     : true,
            reconnection : true
        } 
    )

    //Con el evento 'connect' nos enteramos de que la conexión se ha establecido
    socket.on("connect", conexionEstablecida)

}

function conexionEstablecida(){
    modoConectado()
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

    modoDesconectado()
}