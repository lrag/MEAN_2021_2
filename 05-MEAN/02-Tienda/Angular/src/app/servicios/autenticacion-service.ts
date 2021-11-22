import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

import { ConfiguracionUtil } from './configuracion-util';

@Injectable( { providedIn : "root" } )
export class AutenticacionService {

    public constructor(private httpClient:HttpClient ){
    }

    public getUsuario():Usuario{
        let json:any = sessionStorage.getItem("usuario")
        let usuario:Usuario = JSON.parse(json)
        return usuario
    }

    public getJWT():string|null{
        return sessionStorage.getItem("JWT")
    }

    public login(login:string, password:string):Observable<any>{

        return new Observable(subscribers => {            
            //POST /login
            //CT:app/json
            //---------------------------
            //{ login:AAA, password:BBB }
            this.httpClient.post(ConfiguracionUtil.urlServidor+"/login", { login:login, password:password })
                .subscribe(
                    (respuesta:any) => {
                        sessionStorage.setItem("JWT",respuesta.jwt)
                        sessionStorage.setItem("usuario",JSON.stringify(respuesta.usuario))   
                        subscribers.next()  
                        subscribers.complete()
                    },
                    error => {
                        console.log(error)
                        subscribers.error(error)
                        subscribers.complete()
                    }
                )
        })

    }

    public logout():void{
        sessionStorage.removeItem("JWT")
        sessionStorage.removeItem("usuario")     
    }

    public altaUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/usuarios", usuario)
    }

    public bajaUsuario(usuario:Usuario):Observable<any>{

        return new Observable(subscribers => {
            this.httpClient.delete(ConfiguracionUtil.urlServidor+"/usuarios/"+usuario._id,
                                { headers : { Authorization : "Bearer "+this.getJWT() } })
            .subscribe(
                respuesta => {
                    console.log(respuesta)
                    this.logout()
                    subscribers.next(respuesta)
                    subscribers.complete()
                },
                err => {
                    console.log(err)
                    subscribers.error(err)
                    subscribers.complete()
                }
            )
        })

    }

    public modificarUsuario(usuario:Usuario):Observable<any>{
        return new Observable( subscribers => {
            this.httpClient.patch(
                    ConfiguracionUtil.urlServidor+"/usuarios/"+usuario._id,
                    usuario,
                    { headers : { Authorization : "Bearer "+this.getJWT() } }
                )
                .subscribe(
                    () => {
                        sessionStorage.setItem("usuario",JSON.stringify(usuario))
                        subscribers.next()
                        subscribers.complete()
                    },
                    err => {
                        console.log(err)
                        subscribers.error(err)
                        subscribers.complete()
                    }
                )
        })
    }

}




