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
var x;
var y;
var z = 5;
//Las variables sin tipo pueden guardar cualquier valor en cualquier momento
x = 5;
x = true;
x = "HOLA";
//Variables con tipo:
//var|let|const nombre_variable:TIPO = valor
var numero = 5;
var texto = "Arreando";
var activo = true;
console.log(numero);
//Tipo 'any'
//Es igual que declarar la variable sin indicar el tipo
var movida;
movida = 5;
movida = true;
movida = "HOLA RADIOLA";
//
//ARRAYS
//
//Aqui declaramos una variable del tipo array, pero NO ESTA INICIALIZADA
var array1; //undefined
//Aqui declaramos una variable del tipo array y le asignamos como valor un array vacío
var array2 = [];
//Arrays tipados
//let numeros :number[] //Array que solo puede guardar números
//let palabras:string[] //Array que solo puede guardar cadenas de texto
//Que no se nos olvide inicializar los arrays!
var numeros = [];
var palabras = [];
palabras.push("HOLA RAFFAELLA");
numeros.push(1);
numeros.push(2);
numeros.push(3);
//El transpilador no deja hacer esto:
palabras.push(5);
numeros.push("cuatro");
