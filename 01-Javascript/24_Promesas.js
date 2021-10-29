

function prueba(){

    //Al crear una promesa proporcionamos una función que guarda el código que se va a ejecutar
    //y que realiza una tarea asíncrona
    //Esa función recibe los callbacks
    //'resolve' será la función que se 'pasa' con la llamada a 'then'
    //'reject' la función que se 'pasa' con la llamada a 'catch' 
    let promesa = new Promise(function(resolve, reject){
        console.log("Ejecutando la tarea asíncrona...")
        //Si la tarea sale bien entonces invocaremos resolve()
        //Si la tarea sale mal invocaremos reject()
        //Si llamamos a una no podemos llamar a la otra
        
        //if( ha ido bien )
        //  resolve()
        //else
        //  reject()

    })
    return promesa;    

}

prueba()
    .then(function(){ 
        console.log("OK")
    })
    .catch(function(){ 
        console.log("MAL")
    })

