//
//En node podremos hacer cosas imposibles en el navegador
//-acceder al sistema de archivos
//-comunicarnos con otras aplicaciones (por ejemplo la BB.DD)
//-enviarle comandos al SO
//
//En node.js no disponemos de la mayoría de los objetos implícitos del navegador
//-document
//-window
//-alert
//-localStorage/sessionStorage
//-...
//
//Algunos si están:
//-console
//-JSON
//-...

//La consola en node es la consola del sistema
console.log("Hola mundo")

//Módulos en node
const http = require("http")

//let funcioncilla = function(request, response){
//    ...
//}
//let servidorHTTP = http.createServer(funcioncilla)

let servidorHTTP = http.createServer( function(request, response){
    console.log("Petición recibida en el puerto 1000")

    response.setHeader('content-type', 'text/html')
    let body = crearHTML()
    response.end(body)
} )

servidorHTTP.listen(1000)


function crearHTML(){

    let html = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Nuestra primera web chispas</title>
            </head>
            <body>
                <h2 align="center">
                    <font color="lightGreen">
                        Contenido HTML generado dinámicamente
                    </font>
                </h2>

                <table align="center" border="1">
                    <tr>
                        <th>Titulo</th>
                        <th>Director</th>
                    </tr>
               </table>
            </body>
        </html>`

    return html

}


function listarPeliculas(){
    //Simulamos una consulta a la bb.dd.
    return [
        {
            titulo : 'Indiana Jones',
            director : 'Steven Spielberg'
        },
        {
            titulo : 'Depredador',
            director : 'John McTiernan'
        },
        {
            titulo : 'Los Gremlins',
            director : 'Joe Dante'
        },
        {
            titulo : 'Tron',
            director : 'Steven Lisberger'
        },
        {
            titulo : 'El padrino',
            director : 'Scorsese'
        }
    ]    
}






