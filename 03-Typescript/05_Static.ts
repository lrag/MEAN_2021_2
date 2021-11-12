//
//Si queremos acceder a una propiedad definida en una clase sin tener que crear una instancia antes
//la marcamos con 'static'
//Tambien sirve para métodos
//
class Coche {

    public marca:string
    public modelo: string

    public constructor(marca:string, modelo:string){
        this.marca = marca
        this.modelo = modelo
    }

    public saludar():void{
        console.log(`Hola, soy el coche ${this.marca} ${this.modelo}`)
    }

    //Que una funcion sea estatica significa que se puede invocar sin crear un objeto antes
    //Ello implica que dentro de una función estática no podemos utilizar componentes de la clase
    //que no sean estáticos
    public static saludar2():void{
        //No podemos acceder ni a marca ni a modelo
        //console.log(`Hola, soy el coche ${this.marca} ${this.modelo}`)
    }   

}

Coche.saludar2()

let coche:Coche = new Coche("FIAT", "Uno 45s")
coche.saludar()

class AppModule {

    public static rutas:string[] = ['uno','dos','tres']

    public static saludar():void{
        console.log("OLA KE TAL")
    }

}

//Para acceder a los componentes estáticos de una clase utilizaremos el nombre de la clase
console.log(AppModule.rutas)
AppModule.saludar()