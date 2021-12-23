const jwt = require("jsonwebtoken")
const JWTUtil = require("../util/JWTUtil")

//El token vendrá en el header 'authorization'
//Authorization: Bearer hfjkshgjrwhfjwrhf4jf.jkhfjkeqhduiyrui2fgh42.mndehwuig43yrt428
exports.interceptorJWT = function(request, response, next){

    console.log("----------------------------------------------")
    console.log("Interceptor JWT")

    // :(
    let urlSinParametros = request.url.split("?")[0]
    if((request.method.toUpperCase()=="POST" && urlSinParametros == "/login") || 
        (request.method.toUpperCase()=="POST" && urlSinParametros == "/usuarios")){
        next()
        return //pa no seguir
    }  

    //Leemos el header 'authorization'
    let authorization = request.headers.authorization

    if(!authorization){
        response.status(401).json({ codigo:401, mensaje:"Falta la cabecera de autorización" })
        return
    }

    let trozos = authorization.split(" ")
    if( trozos.length!=2 || trozos[0].toLowerCase()!="bearer" ){
        response.status(400).json({ codigo:401, mensaje:"La cabecera authorization está mal construida" })
        return        
    }

    let token = trozos[1]

    try {
        let payload = jwt.verify(token, JWTUtil.getClave()) //, {algorithm: 'HS512'})
        request.autoridad = payload
    } catch(err){
        response.status(401).json({ codigo:401, mensaje:err.message })
        return 
    }

    next()
}