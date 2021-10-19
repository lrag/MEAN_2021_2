//Para obtener el transpilador
//npm install -g typescript


//TYPESCRIPT
//-----------------------------------
//-Lenguaje creado por Microsoft
//-Superconjunto de JS
//-No permite hacer nada que no permita hacer JS
//-Orientado a objetos con CLASES
//-Con definición de tipos (opcional)
//-Con modificadores de acceso (opcional)
//-Con herencia 
//-Con interfaces
//-Punto y coma opcional :)
//-No se compila
//-No se interpreta
//-No se ejecuta
//-Se transpila a JS y eso es lo que se interpreta en un motor JS


//
//Variables
//

//En typescript las variables pueden tener un tipo
//Es obligatorio declararlas (con var, let o const)

//Variables sin tipo:
var x
let y
const z = 5 

//Las variables sin tipo pueden guardar cualquier valor en cualquier momento
x = 5
x = true
x = "HOLA"

//Variables con tipo:
//var|let|const nombre_variable:TIPO = valor

let numero:number  = 5
let texto :string  = "Arreando"
let activo:boolean = true

console.log(numero)


//Tipo 'any'
//Es igual que declarar la variable sin indicar el tipo
let movida:any
movida = 5
movida = true
movida = "HOLA RADIOLA"

//
//ARRAYS
//


//Aqui declaramos una variable del tipo array, pero NO ESTA INICIALIZADA
let array1:[]  //undefined

//Aqui declaramos una variable del tipo array y le asignamos como valor un array vacío
let array2:[] = [] 

//Arrays tipados
//let numeros :number[] //Array que solo puede guardar números
//let palabras:string[] //Array que solo puede guardar cadenas de texto
//Que no se nos olvide inicializar los arrays!
let numeros :number[] = []
let palabras:string[] = []
palabras.push("HOLA RAFFAELLA")
numeros.push(1)
numeros.push(2)
numeros.push(3)

//El transpilador no deja hacer esto:
//palabras.push(5)
//numeros.push("cuatro")

//Si tenemos la ocurrencia de guardar valores de distintos tipos en el array
//debemos declararlo como 'any[]'
let cosas:any[] = []
cosas.push(0)
cosas.push(true)
cosas.push("dos")

//
//Funciones
//

//Podemos escribir las funciones como si estuvieramos en JS

function sumar(s1, s2, s3){
    console.log(s1+s2+s3)
}

console.log( sumar(10,20,30) )           //60
console.log( sumar("10","20","30") )     //102030
console.log( sumar( true, false, true )) //2?

//Definiendo los tipos en los parámetros
function multiplicar(n1:number, n2:number){
    console.log(n1*n2)
}

multiplicar(25,25) //625
//multiplicar("hola","adios") //No transpila!


//Definiendo el tipo del valor devuelto
function restar(n1:number,n2:number):number{
    return n1-n2
}

let resultado:number //undefined
resultado = restar(100,10)

let resultado2:boolean
//resultado2 = restar(100,10) //No transpila, ñiñiñi

//Disponemos del tipo especial 'void' para las funciones que no devuelven nada
//Su uso es opcional
function saludar(nombre:string):void{
    console.log("Hola "+nombre)
}

saludar("Luis Ramón")

//Aqui el transpilador debería quejarse, pero no lo hace
let historia = saludar("abcdefg")

//
//En typeScript perdemos 'las llamadas con distinto número de parámetros'
//
function dividir(n1:number, n2:number):void{
    console.log(n1/n2)
}

//dividir(1)     //No transpila
dividir(1,2)
//dividir(1,2,3) //No transpila



//Si necesitamos parámetros variables los declaramos explícitamente como tales
//Declaramos el parámetro variable con los tres puntos
//Solo puede haber un parámetro variable
//Y tiene que ser el último
function sumarNumeros(...numeros:number[]):number{
    let total:number = 0
    //TypeScript no deja declarar los tipos un un bucle
    for(let numero of numeros){
        total += numero
    }
    return total
}

console.log( sumarNumeros() )
console.log( sumarNumeros(1) )
console.log( sumarNumeros(1,2) )
console.log( sumarNumeros(1,2,3) )
console.log( sumarNumeros(1,2,3,4) )

console.log("FIN")