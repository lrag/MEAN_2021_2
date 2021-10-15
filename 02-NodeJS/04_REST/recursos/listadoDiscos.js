/*
Asociar una funcion al evento 'load'

añadir el onclick a los dos botones
 Nuevo -> nuevoDisco() {}
 Actualizar -> ???

listar los discos 
 listarDiscos()

rellenar la tabla
 rellenarTablaDiscos()
*/

function nuevoDisco(){
    window.location.href = "formularioDiscos.html"
}

function listarDiscos(){
    $.ajax({
        //url : "http://localhost:3000/discos",
        url : "discos"
    })
    .done(rellenarTablaDiscos)
    .fail(mostrarError)
}

function mostrarError(){

}

function seleccionarDisco(idDisco){
    console.log(idDisco)

    //Podemos guardar el id en el session storage y es estupendo
    //Pero lo vamos a pasar por la url
    window.location.href = "formularioDiscos.html?idDisco="+idDisco
}

function rellenarTablaDiscos(discos){

    $("#tablaDiscos").html('')
    for(let disco of discos){
        $(`
        <tr>
            <td>${disco.titulo}</td>
            <td>${disco.grupo}</td>
            <td>${disco.year}</td>
            <td>${disco.discografica}</td>
        </tr>        
        `)
        //funcion anónima, síncrona, anidada y además es un closure porque utiliza una variable que está declarada en el 'nido'
        .click(function(){
            seleccionarDisco(disco._id)
        })
        .appendTo("#tablaDiscos")
    }

}

$(inicializar)

function inicializar(){
    $("#btnNuevo").click(nuevoDisco)
    $("#btnActualizar").click(listarDiscos)

    listarDiscos()
}
