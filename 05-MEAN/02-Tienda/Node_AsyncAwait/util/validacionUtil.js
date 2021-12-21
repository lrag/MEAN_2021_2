//npm install validatorjs
const Validator = require("validatorjs")

//Si el objeto no cumple las reglas se lanza un error
exports.validar = function(objeto, reglas){
    Validator.useLang('es')
    let validador = new Validator(objeto, reglas)
    if(validador.fails()){
        console.log(validador.errors.errors)
        return { 
            codigo:400, 
            mensaje:'Los datos del son inválidos', 
            errores: validador.errors.errors 
        }  
    }
}