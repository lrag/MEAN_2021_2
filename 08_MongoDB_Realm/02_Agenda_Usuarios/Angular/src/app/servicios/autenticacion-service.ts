import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';
import { App, Credentials } from 'realm-web'

import { ConfiguracionUtil } from './configuracion-util';

@Injectable( { providedIn : "root" } )
export class AutenticacionService {

    public constructor(){
    }

    public getUsuario():Usuario{
        return new Usuario()
    }

    public login(login:string, password:string):Observable<any>{

        return new Observable(function(subscribers){
            //Con javascript:
            //let app:App = new Realm.App({ id: "agenda-nifxu" })
            //Con typescript:
            let app:App = new App({ id : "agendausuarios-cvemp" })

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
    
    public logout():void{
    }
    
    public altaUsuario(usuario:Usuario):Observable<any>{
        return new Observable()
    }
    
    public bajaUsuario(usuario:Usuario):Observable<any>{
        return new Observable()
    }
    
    public modificarUsuario(usuario:Usuario):Observable<any>{
        return new Observable()
    }

}




