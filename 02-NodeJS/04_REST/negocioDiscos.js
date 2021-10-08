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
    
    //Habría que validar que el disco es correcto
    //-que tiene las porpiedades esperadas
    //-que tiene valores legales
    
    let coleccionDiscos = mongoDBUtil.esquema.collection("discos")
    return coleccionDiscos.insertOne(disco)
}

function modificar(disco){
    let coleccionDiscos = mongoDBUtil.esquema.collection("discos")
    return coleccionDiscos.findOneAndUpdate( 
            { _id : new mongodb.ObjectId(disco._id) },
            {
                $set : {
                    //Aqui no podemos colocar el _id (es inmutable)
                    titulo       : disco.titulo,
                    grupo        : disco.grupo,
                    year         : disco.year,
                    discografica : disco.discografica
                },
                //Con $unset indicamos que propiedades queremos ELIMINAR
                //$unset : {
                //    discografica : true
                //}
            },
            {
                //returnOriginal : false,
                //Con la opcion upsert a true si el criterio de búsqueda no ha dado
                //resultado se insertará un nuevo documento con los valores disponibles
                //Es decir, convertimos la consulta en un 'modificar o insertar'
                //upsert : true            
            }
        )
}

function borrar(id){
    let coleccionDiscos = mongoDBUtil.esquema.collection("discos")
    return coleccionDiscos.findOneAndDelete({ _id : new mongodb.ObjectId(id) })
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

