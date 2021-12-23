require("./util/configUtil")
const mongoose = require('mongoose')
const Producto = require("./modelo/entidades/esquemaProducto").Producto

let productos = [
    {
        "nombre"      : "CPC-464",
        "categoria"   : "8 Bit",
        "fabricante"  : "AMSTRAD", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/cpc464.jpg",
        "precio"      : 15,
        "existencias" : 100
    },        
    {
        "nombre"      : "ZX Spectrum",
        "categoria"   : "8 Bit",
        "fabricante"  : "Sinclair", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/zxspectrum.jpg",
        "precio"      : 30,
        "existencias" : 100
    },        
    {
        "nombre"      : "IBM PC 5150",
        "categoria"   : "16 Bit",
        "fabricante"  : "IBM", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/ibm5150.jpg",
        "precio"      : 50,
        "existencias" : 100
    },        
    {
        "nombre"      : "SVI-728",
        "categoria"   : "8 Bit",
        "fabricante"  : "Spectravideo", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/spectravideo.jpg",
        "precio"      : 75,
        "existencias" : 100
    },      
    {
        "nombre"      : "C64",
        "categoria"   : "8 Bit",
        "fabricante"  : "Commodore", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/commodore64.jpg",
        "precio"      : 500,
        "existencias" : 100
    }, 
    {
        "nombre"      : "MSX",
        "categoria"   : "8 Bit",
        "fabricante"  : "Philips", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/philipsMSX.jpg",
        "precio"      : 150,
        "existencias" : 100
    },  
    {
        "nombre"      : "ST",
        "categoria"   : "16 Bit",
        "fabricante"  : "Atari", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/atariST.jpg",
        "precio"      : 40,
        "existencias" : 100
    },
    {
        "nombre"      : "Amiga 500",
        "categoria"   : "16 Bit",
        "fabricante"  : "Commodore", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/amiga500.jpg",
        "precio"      : 50,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Discos 3/5",
        "categoria"   : "Almacenamiento",
        "fabricante"  : "Bulk", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/discos35Pulgadas.jpg",
        "precio"      : 50,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Cassette",
        "categoria"   : "Almacenamiento",
        "fabricante"  : "Bulk", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/cassette.jpg",
        "precio"      : 40,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Discos 5 1/4",
        "categoria"   : "Almacenamiento",
        "fabricante"  : "Bulk", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/discos525Pulgadas.jpg",
        "precio"      : 75,
        "existencias" : 100
    },                                 
    {
        "nombre"      : "Discos 3''",
        "categoria"   : "Almacenamiento",
        "fabricante"  : "Bulk", 
        "descripcion" : "Lorem fistrum quietooor benemeritaar torpedo te va a hasé pupitaa. Apetecan te voy a borrar el cerito te voy a borrar el cerito mamaar por la gloria de mi madre te va a hasé pupitaa pecador fistro a wan a wan. Papaar papaar llevame al sircoo ese que llega a gramenawer caballo blanco caballo negroorl te voy a borrar el cerito pecador. Tiene musho peligro hasta luego Lucas va usté muy cargadoo ese pedazo de caballo blanco caballo negroorl. De la pradera a gramenawer benemeritaar fistro me cago en tus muelas fistro quietooor jarl. Fistro me cago en tus muelas por la gloria de mi madre te va a hasé pupitaa no puedor no te digo trigo por no llamarte Rodrigor. A gramenawer a gramenawer diodenoo ese pedazo de mamaar está la cosa muy malar fistro no puedor ese hombree benemeritaar por la gloria de mi madre.",
        "imagen"      : "productos/discos3pulgadas.jpg",
        "precio"      : 30,
        "existencias" : 100
    }                                 
]

cargarProductos()
    .then( () => console.log("FIN!"))
    .catch( err => console.log(err))

function cargarProductos(){

    return new Promise(function(resolve, reject){
        mongoose.connect(process.env.url_bbdd)
        .then( () => {
            return Producto.deleteMany({})
        })
        .then( rs => {
            console.log(rs)
            return Producto.insertMany(productos)
        })
        .then( rs => {
            console.log("Productos insertados:"+rs.length)
            return mongoose.disconnect()
        })
        .then(() => {
            console.log("FIN")
            resolve()
        })
        .catch( error => {
            console.log(error)
            reject(error)
        })
    })
    
}

