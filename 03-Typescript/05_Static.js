var Coche = /** @class */ (function () {
    function Coche(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
    }
    Coche.prototype.saludar = function () {
        console.log("Hola, soy el coche " + this.marca + " " + this.modelo);
    };
    return Coche;
}());
var coche = new Coche("FIAT", "Uno 45s");
coche.saludar();
//
//Si queremos acceder a una propiedad definida en una clase sin tener que crear una instancia antes
//la marcamos con 'static'
//Tambien sirve para métodos
//
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule.saludar = function () {
        console.log("OLA KE TAL");
    };
    AppModule.rutas = ['uno', 'dos', 'tres'];
    return AppModule;
}());
//Para acceder a los componentes estáticos de una clase utilizaremos el nombre de la clase
console.log(AppModule.rutas);
AppModule.saludar();
