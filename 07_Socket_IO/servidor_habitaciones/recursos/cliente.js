//Con esta variable referenciaremos al socket
let socket = null

function obtenerSalas(){
    $.ajax({
        url : "/salas"
    })
    .done(rellenarSalas)
    .fail( err => console.log(err))
}

function rellenarSalas(salas){
    console.log(salas)
    for(let sala of salas){
        let radio = $(`<input id="${sala}" type='radio' name='sala' value='${sala}'>`).click(seleccionarSala) 
        let div = $("<div></div>")
        div.append(radio)
        div.append(" "+sala)
        $("#salas").append(div)   
    }
}

function seleccionarSala(){
    let sala = $("[name=sala]:checked").val()
    console.log(sala)
}

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
            reconnection : false
        } 
    )

    //Con el evento 'connect' nos enteramos de que la conexión se ha establecido
    socket.on("connect", conexionEstablecida)
    socket.on("mensaje", mensajeRecibido)
    socket.on("aliasUsuarios", rellenarAliasUsuarios)
    socket.on("aliasRepetido", aliasRepetido)
}

function conexionEstablecida(){
    modoConectado()
    //Enviamos el alias
    //Los mensajes tienen solo dos valores:
    //-nombre del mensaje (string)
    //-valor del mensaje (string)
    let alias = $("#alias").val()
    socket.emit("alias", alias)
    obtenerSalas()
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
    let mensaje = {
        alias :  $("#alias").val(),
        texto : texto
    }

    socket.emit("mensaje", JSON.stringify(mensaje))
    $("#mensaje").val("")
}

function mensajeRecibido(mensajeJSON){
    let mensaje = JSON.parse(mensajeJSON)
    $(`<div>${mensaje.alias}: ${mensaje.texto}</div>`).appendTo("#mensajes")
}

function rellenarAliasUsuarios(json){
    $("#usuarios").html("")
    let arrayAliasUsuarios = JSON.parse(json)
    for(let alias of arrayAliasUsuarios){
        $(`<li>${alias}</li>`).appendTo("#usuarios")
    }
}

function aliasRepetido(){
    desconectar()
    alert("El alias ya existe. Por favor escoja otro")
}

function modoDesconectado(){
    $("#btnConectar").prop("disabled",false)
    $("#alias").prop("disabled",false)

    $("#btnDesconectar").prop("disabled",true)
    $("#btnEnviar").prop("disabled",true)
    $("#mensaje").prop("disabled",true)

    $("#mensajes").html("")
    $("#usuarios").html("")
    $("#salas").html("")
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