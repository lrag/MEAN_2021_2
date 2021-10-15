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
    console.log("Nuevo disco")
}

function listarDiscos(){
    $.ajax({
        //url : "http://localhost:3000/discos",
        url : "discos",
    })
    .done(rellenarTablaDiscos)
    .fail(mostrarError)
}

function mostrarError(){

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
        .appendTo("#tablaDiscos")
    }


}

$(inicializar)

function inicializar(){
    $("#btnNuevo").click(nuevoDisco)
    //$("#btnActualizar").click(???)

    listarDiscos()
}
