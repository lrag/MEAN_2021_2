const { Console } = require("console")
const mongodb = require("mongodb") //npm install mongodb

exports.conectarBBDD = function(){
    
    //Resolve es la función que recibirá la promesa con 'then'
    //Reject es la función que recibirá la promesa con 'catch'
    return new Promise(function(resolve, reject){
        console.log("Conectando con la base de datos...")
        console.log("IP    :"+process.env.bbdd_ip)
        console.log("Puerto:"+process.env.bbdd_puerto)
    
        const url = `mongodb://${process.env.bbdd_ip}:${process.env.bbdd_puerto}`
        const client = new mongodb.MongoClient(url)
    
        client
            .connect()
            .then(function(dbs){
                console.log("Conexión establecida")
                
                let esquema = dbs.db("tienda")
                //Cuidado que en process.env solo podemos guardar cadenas de texto y aqui estariamos intentando guardar un objeto!!!
                //process.env.esquema = esquema
                process.esquema = esquema

                resolve()
            })
            .catch(function(err){
                console.log("Error al establecer la conexión.", err.message)
                reject();
            })        
    })

}

