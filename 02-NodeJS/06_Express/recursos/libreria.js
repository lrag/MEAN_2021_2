//Crea un objeto a partir de los campos de un formulario
//Requisitos:
//-el formulario debe tener id
//-los campos del formulario deben tener id
//-las propiedades del objeto coincidirán con el id de los campos
function crearObjeto(idFormulario){
    //Creamos un objeto sin propiedades
    let objeto = {}

    /*Con JS a secas
    Nodos dentro de #formulario que sean input, select o textareas
    let nodos = document.querySelectorAll("#"+idFormulario+" input,textarea,select")
    //Le asignamos al objeto las propiedades necesarias
    for(let nodo of nodos){
        let id    = nodo.id
        let valor = nodo.value
        objeto[id] = valor
    }
    */

    //Podemos utilizar la función 'each'
    $("#"+idFormulario+" input,textarea,select")
        .each(function(){
            objeto[this.id] = this.value
        })

    return objeto
}

//Vacía los campos de un formulario
//Requisitos:
//-Que el formulario tenga id
//-Puede ser cualquier etiqueta
function vaciarFormulario(idFormulario){
    $(`#${idFormulario} input,textarea,select`)
        .val("")
}

//Rellena los campos de un formulario con el objeto recibido
//Requisitos:
//-Los ids de los campos han de coincidir con las propiedades del objeto
function rellenarFormulario(objeto){
    for(let propiedad in objeto){
        $(`#${propiedad}`).val(objeto[propiedad])
    }
}

//Parámetros obligatorios
//-array de objetos.
//
//Parámetros opcionales:
//{
//    columnas    : [],
//    propiedades : [],
//    idTabla     : "",
//    class       : "", 
//    onclick     : function(obj que ocupa la fila en la que se ha hecho click){}
//}
function generarTabla(objetos, parametrosOpcionales){

    //Comprobamos si vienen los nombres de las columnas
    //Si no vienen se utilizan los nombres de TODAS las propiedades del 
    //primer objeto que haya en 'objetos''
    let nombresColumnas    = []   
    let nombresPropiedades = [] 
    if(parametrosOpcionales && parametrosOpcionales.columnas){
        nombresColumnas = parametrosOpcionales.columnas
        nombresPropiedades = parametrosOpcionales.propiedades
    } else {
        let primerObjeto = objetos[0]
        for(let propiedad in primerObjeto){
            let x = propiedad.slice(0,1).toUpperCase()+propiedad.slice(1)
            nombresColumnas.push(x)
            nombresPropiedades.push(propiedad)
        }
    }

    //Comprobamos si viene el id para la tabla
    let idTabla = null
    if( parametrosOpcionales && parametrosOpcionales.idTabla){
        idTabla = parametrosOpcionales.idTabla
    } else {
        idTabla = "tabla-"+Date.now()
    }

    //Comprobamos si viene la funcion para el onclick
    let onclick = null
    if( parametrosOpcionales && parametrosOpcionales.onclick){
        onclick = parametrosOpcionales.onclick
    }

    ////////////////////
    //Creamos la tabla//
    ////////////////////

    let tabla = $(`<table id="${idTabla}" border="1" align="center"></table>`)
    //Creamos la cabecera
    let trCabecera = $(`<tr></tr>`)
    //Añadimos los TH correspondientes
    $(nombresColumnas).each(function(){
        trCabecera.append(`<th>${this}</th>`)
    })
    tabla.append(trCabecera)
    
    //En este bucle recorremos los objetos y creamos los tr
    $(objetos).each(function(pos, obj){
        let tr = $("<tr>")
        //En este bucle recorremos las propiedades y creamos los td
        $(nombresPropiedades).each(function(pos, nombrePropiedad){
            $("<td>"+eval(`obj.${nombrePropiedad}`)+"</td>").appendTo(tr)
        })

        //Si nos han pasado el onclick se lo asignamos al tr
        if(onclick){
            tr.click(function(){
                $(`#${idTabla} tr`).css('background-color', 'white')
                this.style.background = 'lightGreen'
                onclick(obj)
            })
        }
        tr.appendTo(tabla)
    })

    return tabla

}

