//Importando las clases de una en una
//import { Calculadora } from "./04_Export";
//import { Saludador } from "./04_Export";
import { Saludador, Calculadora } from "./04_Export";

let calculadora:Calculadora = new Calculadora();
let saludador:Saludador = new Saludador();

console.log(calculadora.sumar(10,20));
console.log(saludador.saludar("Luis Ramón"));

//Importando un fichero entero (es como en un require de node)
import * as movida from "./04_Export";

let calculadora2:movida.Calculadora = new movida.Calculadora();

