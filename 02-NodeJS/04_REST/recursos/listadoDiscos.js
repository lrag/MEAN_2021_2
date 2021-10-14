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

function rellenarTablaDiscos(){
    console.log("rellenando la tabla")
}

$(inicializar)

function inicializar(){
    $("#btnNuevo").click(nuevoDisco)
    //$("#btnActualizar").click(???)

    listarDiscos()
}

