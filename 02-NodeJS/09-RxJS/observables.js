"use strict";
exports.__esModule = true;
//npm install rxjs
var rxjs_1 = require("rxjs");
const Observable = require("rxjs").Observable

//PROMESAS//////////////////////////////////////////////

let promesa = new Promise(function(resolve, reject){
    //código asociado a la promesa

    //Resolve es la función que se pasa en el 'then'
    resolve("OK (promesa)")
    //reject es la función que se pasa en el 'catch'
    //reject("ZASCA!")
})

promesa.then( mensaje => console.log(mensaje) )
promesa.catch( err => { console.log(err)} )


//OBSERVABLES///////////////////////////////////////////
/*
let observable = new Observable(function(subscriber){
    subscriber.next("OK (observable)")
    //subscriber.error("ZASCA TARRASCA!")
    subscriber.complete()
})

observable.subscribe(
    //Esta función es subscriber.next
    mensaje => console.log(mensaje),
    //Esta funcion es subscriber.error
    error => console.log(error)  
)
*/

/*
function movida(){
    return new Observable(function(subscriber){
        subscriber.next(1)
        subscriber.next(2)
        subscriber.next(3)
        subscriber.next(4)
        subscriber.next(5)
        subscriber.next(6)
        subscriber.complete()
    })
}

movida().subscribe(
    numero => console.log("Subscriptor:"+numero)    
)
*/



let observable3 = new Observable(function(subscriber){

    subscriber.next(1)
    
    setTimeout(function(){
        subscriber.next(2)
    }, 1000)
    setTimeout(function(){
        subscriber.next(3)
    }, 2000)
    setTimeout(function(){
        subscriber.next(4)
    }, 3000)
    setTimeout(function(){
        subscriber.next(5)
    }, 4000)
    setTimeout(function(){
        subscriber.next(6)
    }, 5000)
    setTimeout(function(){
        subscriber.next(7)
    }, 6000)
    setTimeout(function(){
        subscriber.next(8)
    }, 7000)

    setTimeout(function(){
        subscriber.complete()
    }, 8000)
    
})

//A un observable se puede subscribir vários subscriptores

observable3.subscribe(
    numero => console.log("Subscriptor 1:"+numero)    
)
observable3.subscribe(
    numero => console.log("Subscriptor 2:"+numero)    
)
observable3.subscribe(
    numero => console.log("Subscriptor 3:"+numero)    
)


const https = require("https")

function enviarPeticionPromesa(){

    return new Promise(function(resolve, reject){

        var options = {
            method: 'GET',
            host: 'jsonplaceholder.typicode.com',
            port: '443',
            path: '/users'
        }

        let req = https.request(options, function(respuesta){
            console.log("Respuesta recibida")
            respuesta.on("data", function(body){
                console.log(body.toString())
                resolve(body.toString())
            })
        })
        req.on("error", function(error){
            console.log(error)
            reject(error)
        })
        req.end()
    })
}

function enviarPeticionObservable(){

    return new Observable(function(subscriber){
        let options = {
            host: 'jsonplaceholder.typicode.com',
            path: '/users',
            port: '443',
            method: 'GET'
        }

        let req = https.request(options, function(respuesta){
            console.log("Respuesta recibida")
            respuesta.on("data", function(body){
                //console.log(body.toString())
                subscriber.next(body.toString())
                subscriber.complete()
            })
        })
        req.on("error", function(error){
            console.log(error)
            subscriber.error(error)
            subscriber.complete()
        })
        req.end()
    })

}

enviarPeticionObservable()
.subscribe(
    usuarios => {
        console.log(usuarios.length)
        console.log(usuarios)
    },
    error => console.log(error)
)


enviarPeticionPromesa()
.then(respuesta => console.log(respuesta))
.catch(error => console.log(error))


setTimeout(function(){
    console.log("FIN")
},3000)

