const mongodb = require("mongodb")
const mongoDBUtil = require("./mongoDBUtil")

//'exports' es un objeto implícito que de entrada no tiene propiedades
//Le vamos añadiendo lo que queremos exportar como valores de propiedades

exports.listar      = listar
exports.buscarPorId = buscarPorId
exports.insertar    = insertar
exports.modificar   = modificar
exports.borrar      = borrar

function listar(){
    //PUT YOUR CODE HERE
    let coleccionDiscos = mongoDBUtil.esquema.collection("discos")

    let cursor = coleccionDiscos.find() 
    return cursor.toArray()


}

function buscarPorId(id){
    let coleccionDiscos = mongoDBUtil.esquema.collection("discos")
    let objectId = new mongodb.ObjectId(id)
    return coleccionDiscos.findOne( { _id : objectId } )
}

function insertar(disco){



    
}

function modificar(disco){
}

function borrar(id){
}

//Tambien podemos definir las funciones como anónimas en el export:
/*
exports.listar = function(){
}

exports.buscar = function(id){
}

exports.insertar = function(disco){
}

exports.modificar = function(disco){
}

exports.borrar = function(id){
}
*/

//Tambien podríamos hacer algo así:
/*
exports.negocioDiscos = {
    listar : function(){
    },
    
    buscar : function(id){    
    },
    
    insertar : function(disco){    
    },
    
    modificar : function(disco){    
    },
    
    borrar : function(id){    
    }
}
*/

