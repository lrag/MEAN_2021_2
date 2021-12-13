
function modoDesconectado(){
    $("#btnConectar").prop("disabled",false)
    $("#btnDesconectar").prop("disabled",true)
    $("#btnEnviar").prop("disabled",true)
    $("#mensaje").prop("disabled",true)
}

function modoConectado(){
    $("#btnConectar").prop("disabled",true)
    $("#btnDesconectar").prop("disabled",false)
    $("#btnEnviar").prop("disabled",false)
    $("#mensaje").prop("disabled",false)
}

$(inicializar)
function inicializar(){
    console.log("inicializando")

    modoDesconectado()
}