//npm install validatorjs
const Validator = require("validatorjs")

//Si el objeto no cumple las reglas se invocará el callback
exports.validar = function(objeto, reglas, callbackError){

    Validator.useLang('es')
    let validador = new Validator(objeto, reglas)
    if(validador.fails()){
        console.log(validador.errors.errors)
        callbackError( { codigo:400, 
                    mensaje:'Los datos del son inválidos', 
                    errores: validador.errors.errors } ) //Mal
        return
    }

}