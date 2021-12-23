import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';
import { App, Credentials } from 'realm-web'
import { RealmService } from './realm-service';

@Injectable( { providedIn : "root" } )
export class AutenticacionService {

    public constructor(private realmService:RealmService){
    }

    public getUsuario():Usuario{        
        let app:App = this.realmService.getApp()
        let usuarioRealm:any = app.currentUser
        return new Usuario(
                usuarioRealm.id,
                usuarioRealm._profile.data.email,
                usuarioRealm.customData.nombre,
                usuarioRealm.customData.direccion,
                usuarioRealm.customData.telefono,
            )    
    }
    
    public login(login:string, password:string):Observable<any>{
        return new Observable(subscribers => {
            let app:App = this.realmService.getApp()
            let credenciales = Credentials.emailPassword(login, password)

            app.logIn(credenciales)
            .then( usuario => {
                console.log(usuario)
                subscribers.next()
                subscribers.complete()
            })
            .catch( err => {
                console.log(err) 
                subscribers.error(err)
                subscribers.complete()
            })   
        })
    }
    
    public logout():Promise<any>{
        return this.realmService.getApp().currentUser.logOut() //Esto devuelve una promes
    }
    
    public altaUsuario(registro:any):Observable<any>{

        return new Observable(subscribers => {

            let app:App = this.realmService.getApp()   
        
            //Primero registramos el usuario
            app.emailPasswordAuth.registerUser(registro.email, registro.password)
            .then( () => {
                console.log("Usuario registado")
                //Necesitamos insertar la información adicional en la coleccion 'custom-user-data'
                //Nos hacen falta dos cosas:
                //-la información extra (la obtenemos del formulario y la hemos recibido por parámetro)
                //-el id del usuario
                //-el esquema para poder hacer el insertOne
                //Hacemos login con el usuario que se acaba de registrar:
                let credenciales = Credentials.emailPassword(registro.email, registro.password)
                return app.logIn(credenciales)
            })
            .then( usuario => {
                //HABER KE ME DECIS
                console.log(usuario)
                let id = usuario.id
    
                let customUserData = {
                    idUsuario   : id,
                    nombre      : registro.nombre,
                    //direccion : registro.direccion //Este dato no lo pedimos durante el registro
                    //telefono  : registro.telefono  //ídem
                }
    
                console.log("Insertando custom_user_data")
                const mongo = usuario.mongoClient("mongodb-atlas")
                //Obtenemos el esquema
                const esquema = mongo.db("bbdd_agenda_usuarios")
                return esquema.collection("custom_user_data").insertOne(customUserData)
            })
            .then( resultado => {
                console.log("Custom user data insertado")
                subscribers.next()
                subscribers.complete()
            })
            .catch( err => {
                console.log(err)
                subscribers.error()
                subscribers.complete()
            })
        })
    }
    
    public bajaUsuario(usuario:Usuario):Observable<any>{
        return new Observable()
    }
    
    public modificarUsuario(usuario:Usuario):Observable<any>{
        
        console.log(this.realmService.getApp().currentUser)

        return new Observable( subscribers => {

            console.log("Modificando custom_user_data")
            this.realmService
                .getEsquema()
                .collection("custom_user_data")
                .findOneAndUpdate(
                    { idUsuario : usuario._id },
                    { $set : {
                            nombre    : usuario.nombre,
                            direccion : usuario.direccion,
                            telefono  : usuario.telefono
                        } 
                    }
                )
                .then( (rs:any) => {
                    console.log(rs)
                    console.log("Actualizando el local storage")
                    return this.realmService.getApp().currentUser.refreshCustomData()
                })
                .then( (x:any) =>{
                    console.log("YA")
                    console.log(this.realmService.getApp().currentUser)
                    subscribers.next()
                    subscribers.complete()
                })
                .catch( (error:any) => {
                    console.log(error) 
                    subscribers.error(error)
                    subscribers.complete()
                })   

        })
    }

}




