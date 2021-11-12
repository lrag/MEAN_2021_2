const http = require("http")
const express = require("express")


function arrancarServidor(){
   
    console.log("Arrancando el servidor HTTP")
    
    let app = express()

    app.get("/discos", listar)
    app.get("/discos/:id", buscarPorId)
    app.post("/discos", insertar)
    app.patch("/discos/:id", modificar)
    app.delete("/discos/:id", borrar)

    app.use(express.static("./recursos"))

    //let servidor = http.createServer(app)
    //servidor.listen(5000, function(){
    //    console.log("Esperando peticiones en el puerto 5000")
    //})

    app.listen(5000, function(){
        console.log("Esperando peticiones en el puerto 5000")
    })

}

//////////////////////////////////////////////////////////////////
//FUNCIONES CON LA LÓGICA DE CONTROL//////////////////////////////
//////////////////////////////////////////////////////////////////

/*
Las tareas de la lógica de control en un api REST son las siguientes:

-Extraer de la petición los valores necesarios
    -query parameters
    -parámetros interpolados en la ruta
    -contenido del body
    -valores en los headers
    -cualquier combinación de los anteriores

-Invocar la función con la lógica de negocio

-Componer y entregar la respuesta

-Y YA!
*/

/*
GET /discos
*/
function listar(request, response){
    //Aqui no hay que extraer nada del request
    console.log("listando...")

    negocioDiscos.listar()
        .then(function(discos){
            response.json(discos)
        })
        .catch(function(err){
            devolverError(500, "Hubo un error con la bb.dd.", response)
        })    
}

/*
GET /discos/:id
*/
function buscarPorId(request, response){    
    //Aqui hay que extraer un valor de la URL
    let id = request.params.id

    console.log("buscando un disco por el id:"+id)

    negocioDiscos.buscarPorId(id)
        .then(function(disco){
            if(!disco){
                devolverError(404, `No existe un disco con el id ${id}`, response)
                return             
            }
            response.json(disco)
        })
        .catch(function(err){
            devolverError(500, "Hubo un error con la bb.dd.", response)
        })
}

/*
POST /discos
CT: app/json
------------
{ disco }

201 CREATED
CT: app/json
------------
{ _id : ID }
*/
function insertar(request, response){
    console.log("insertando...")

    let disco = request.body

    console.log("Disco:",disco)

    //llamadita a la lógica de negocio
    negocioDiscos.insertar(disco)
        .then(function(result){
            response.statusCode = 201
            let respuesta = {
                codigo : 201,
                _id : result.insertedId
            }
            response.json(respuesta)
        })
        .catch(function(err){
            devolverError(500, "Hubo un error con la bb.dd.", response)
        })
}

/*
PATCH /discos/:id
CT: app/json
------------
{ 
    _id : ABCDEF <-- este id será ignorado de manera activa
    titulo :
    grupo :
    year :
    discografica :      
}
*/
function modificar(request, response){
    console.log("Modificando...")
    //Tenemos que leer el body y sacar el id de la url
    let id = request.params.id
    let disco = request.body
    disco._id = id
    negocioDiscos.modificar(disco)
        .then(function(resultado){
            if(!resultado.value){
                devolverError(404, `No existe un disco con el id ${id}`, response)
                return             
            }
            response.json(resultado.value)
        })
        .catch(function(err){
            devolverError(500, "Hubo un error con la bb.dd.", response)
        })
}

/*
DELETE /discos/:id
*/
function borrar(request, response){
    console.log("borrando...")

    //Tenemos que el id de la url
    let id = request.params.id

    negocioDiscos.borrar(id)
        .then(function(result){
            if(!result.value){
                devolverError(404, `No existe un disco con el id ${id}`, response)
                return                  
            }
            let respuesta = {
                codigo : 200,
                mensaje : `El disco ${id} se ha borrado`
            }
            response.json(respuesta)            

        })
        .catch(function(err){
            devolverError(500, "Hubo un error con la bb.dd.", response)
        })
}


//Esta función estaría mucho mejor en un fichero aparte
function devolverError(codigo,mensaje,response){
    let error = {
        codigo  : codigo,
        mensaje : mensaje
    }
    response.statusCode = codigo
    response.json(error)
}

