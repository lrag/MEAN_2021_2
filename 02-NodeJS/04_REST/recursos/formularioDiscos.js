function insertarDisco(){

    /*
    let disco = {
        titulo       : $("#titulo").val(),
        grupo        : $("#grupo").val(),
        year         : $("#year").val(),
        discografica : $("#discografica").val(),
        comentario   : $("#comentario").val(),
    }
    */

    /*
    //Poniendo nosotros el for
    let disco = {}
    let objJQuery = $("#formulario input[type=text], textarea")
    for(let nodo of objJQuery){
        disco[nodo.id] = nodo.value
    }
    console.log(disco2)
    */
   
    //JQuery style
    let disco = {}
    $("#formulario input[type=text], textarea").each(function(){
        disco[this.id] = this.value
    })

    $.ajax({
        type : "POST",
        url  : "discos",
        contentType : "application/json",
        data : JSON.stringify(disco)
    })
    .done(verListado)
    .fail(mostrarError)

}

function verListado(){
    window.location.href = "listadoDiscos.html"
}

function mostrarError(error){
    alert("Error!")
} 

$(inicializar)

function inicializar(){
    $("#btnInsertar").click(insertarDisco)
    $("#btnVolver").click(verListado)
}
