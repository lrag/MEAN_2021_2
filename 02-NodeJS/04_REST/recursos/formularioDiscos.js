//En esta variable guardamos el id del disco que ocupa el formulario
let idDiscoSel = null

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

function buscarDisco(idDisco){
    $.ajax( {
        url : "discos/"+idDisco
    } )
    .done(rellenarFormulario)
    .fail(mostrarError)
}

function rellenarFormulario(disco){
    console.log("Rellenar formulario")

    //Guardamos el id del disco para cuando se pulse 'modificar' o 'borrar'
    idDiscoSel = disco._id

    /*
    $("#titulo").val(disco.titulo)
    $("#grupo").val(disco.grupo)
    $("#year").val(disco.year)
    $("#discografica").val(disco.discografica)
    $("#comentario").val(disco.comentario)
    */

    $("#formulario input[type=text],textarea").each(function(){
        this.value = disco[this.id]
    })

}

function modificarDisco(){

    let disco = {}
    $("#formulario input[type=text], textarea").each(function(){
        disco[this.id] = this.value
    })  
    
    $.ajax({
        type        : "PATCH",
        url         : "discos/"+idDiscoSel,
        contentType : "application/json",
        data        : JSON.stringify(disco)
    })
    .done(verListado)
    .fail(mostrarError)

}

function borrarDisco(){
    $.ajax({
        type : "DELETE",
        url  : "discos/"+idDiscoSel,
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
    $("#btnModificar").click(modificarDisco)
    $("#btnBorrar").click(borrarDisco)
    $("#btnVolver").click(verListado)

    //Accedemos a la barra del navegador para ver si nos han dejado el id de un disco
    //http://localhost:3000/formularioDiscos.html?idDisco=615d79185d87fedd1ae5e936?hjfkdshfkjhfkjwd
    
    let url = window.location.href

    let trozos = url.split("?")
    if(trozos.length == 2){
        //Damos por sentado que solo hay un parámetro y que guarda el valor del _id
        let idDisco = trozos[1].split("=")[1]
        console.log(idDisco)
        buscarDisco(idDisco)
    } 
   
}
