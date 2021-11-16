import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

import { ConfiguracionUtil } from './configuracion-util';

@Injectable( { providedIn : "root" } )
export class AutenticacionService {

    public constructor(private httpClient:HttpClient ){
    }

    public getUsuario(){

    }

    public getJWT(){

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

    public altaUsuario(usuario:Usuario):Observable<any>{
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/usuarios", usuario)
    }

    public bajaUsuario():void{

    }

    public modificarUsuario():void{

    }

}




