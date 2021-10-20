////////////
// CLASES //
////////////

import { moveCursor } from "readline"

//Las clases on los moldes que se utilizan para crear los objetos

//Identidad/estado  : datos
//Funcionalidad     : qué hace

class CuentaBancaria {

    //Identidad
    //Propiedades/atributos/campos/variables de clase/variables miembro   
    IBAN     : string
    banco    : number
    sucursal : number
    dc       : number
    libreta  : number

    //Funcionalidad
    //Dentro de una clase no se utiliza la palabra reservada 'function'
    toString():string{
        //Pra acceder a un componente de la clase dentro de una de sus funciones
        //hay que utilizar 'this'        
        return this.IBAN+this.banco+this.sucursal+this.dc+this.libreta
    }

}

//Instanciando un objeto

//Sin usar el tipo:
//let cb1 = new CuentaBancaria()
//
//Usando el tipo (una vez creada una clase tenemos un nuevo tipo de variables):
let cb1:CuentaBancaria = new CuentaBancaria()
cb1.IBAN = "ABCD"
//cb1.IBAN = 1234
cb1.banco = 1234
//cb1.banco = "ABCD"
cb1.sucursal = 5678
cb1.dc = 90
cb1.libreta = 1234567890

//cb1.tocoto = 100


//
//Contructores
//
//En typescript podemos tener un constructor (y solo uno)
//No hay sobrecarga de constructores
//El constructor debe llamarse 'constructor'
//El constructor no devuelve nada, pero no es 'void'
//Todas las clases tienen constructor, aunque sea implícitamente

class Libro {
    ISBN   : string
    autor  : string
    titulo : string

    constructor(ISBN:string, autor:string, titulo:string){
        this.ISBN   = ISBN
        this.autor  = autor
        this.titulo = titulo
    }
}

//let libro1:Libro = new Libro()
//libro1.ISBN = "ABCDE"
//libro1.titulo = "El corazón de las tinieblas"
//libro1.autor = "Joseph Conrad"

let libro1:Libro = new Libro("ABCDE","El corazón de las tinieblas","Joseph Conrad")
console.log(libro1.titulo+", "+libro1.autor)

//Si quisieramos crear un libro sin tener los datos tendríamos que hacer esta cosa fea:
let libro2:Libro = new Libro(null, null, null)

//Podemos asignar valores por defecto a los parámetros del constructor (en realidad a los parámetros
//de cualquier constructor)
class Alumno {

    nombre    : string
    direccion : string
    negativos : number

    constructor(nombre    : string = null,
                direccion : string = null,
                negativos : number = 0){
        this.nombre    = nombre
        this.direccion = direccion
        this.negativos = negativos
    }
}

let alumno1:Alumno = new Alumno()
let alumno2:Alumno = new Alumno("Fulanito")
let alumno3:Alumno = new Alumno("Fulanita","C/Falsa,123")
let alumno4:Alumno = new Alumno("Menganito","C/Tal,123",500)
//si solo tenemos los negativos tenemos que hacerlo así
let alumno5:Alumno = new Alumno(null,null,500)
//Si solo tenemos nombre y negavitos:
let alumno6:Alumno = new Alumno("Menganita",null,500)


//
//Modificadores de acceso
//
//-Son opcionales
//
//-Tienen el mismo significado que en C++
//-public
//-protected
//-private
//
//-pueden colocarse en:
//  -propiedades
//  -funciones (incluyendo los constructores)
//-no pueden colocarse en la clase

class Prueba {
    //los componentes sin modificador de acceso son 'public'
    dato1 : number
    public    dato2 : number
    protected dato3 : number = 30
    private   dato4 : number = 40

    funcion1(){}
    public funcion2(){}
    protected funcion3(){}
    private funcion4(){}
}

let p1:Prueba = new Prueba()
p1.dato1 = 10
p1.dato2 = 20
//p1.dato3 = 30 //Solo es visible dentro de la clase y subclases
//p1.dato4 = 40 //Solo es visible dentro de la clase

p1.funcion1()
p1.funcion2()
//p1.funcion3()
//p1.funcion4()

//
//Typescript tiene un atajo estupendisimo para definir clases y constructores
//

/*
class Punto {
    public x:number 
    public y:number

    constructor(x:number, y:number){
        this.x = x
        this.y = y
    }
}

class Poligono {
    public nombre:string
    public vertices:Punto[]

    constructor(nombre:string, vertices:Punto[]){
        this.nombre   = nombre
        this.vertices = vertices
    }
}

class Linea {
    public p1:Punto
    public p2:Punto
    public segmento:boolean

    constructor(p1      :Punto  = null,
                p2      :Punto  = null,
                segmento:boolean=false){
        this.p1 = p1
        this.p2 = p2
        this.segmento = segmento
    }
}

*/

//Si colocamos modificadores de acceso en los parámetros del constructor
//dichos parámetros se convierten mágicamente en atributos de la clase
//cuyo valor será en entregado al constructor

class Punto {
    //public x:number 
    //public y:number

    constructor(public x:number = null, 
                public y:number = null){
        //this.x = x
        //this.y = y
    }
}

class Poligono {
    //public nombre:string
    //public vertices:Punto[]

    constructor(public nombre:string = null, 
                public vertices:Punto[] = []){
        //this.nombre   = nombre
        //this.vertices = vertices
    }
}

class Linea {
    constructor(public p1      :Punto  = null,
                public p2      :Punto  = null,
                public segmento:boolean=false){
    }
}

class Circulo {
    //public centro:Punto
    //public radio:number

    constructor(public centro:Punto = null, 
                public radio :number = null){
        //this.centro = centro
        //this.radio = radio
    }
}

let punto1 = new Punto(10,20)
console.log(punto1.x)
console.log(punto1.y)

let circulo:Circulo = new Circulo()



/*

class Producto {
    _id         : string
    nombre      : string
    fabricante  : string
    peso        : number
    descripcion : string
}

class Cliente {
    _id       : string
    codigo    : string
    nombre    : string
    direccion : string
    telefono  : string
}

class DetallePedido {
    cantidad : number
    precio   : number
    producto : Producto
}

class Pedido {
    _id      : string
    codigo   : string
    fecha    : string
    cliente  : Cliente
    detalles : DetallePedido[]
    total    : number
}

*/






