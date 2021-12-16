import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../entidades/usuario';

import { ConfiguracionUtil } from './configuracion-util';

@Injectable( { providedIn : "root" } )
export class AutenticacionService {

    public constructor(){
    }

    public getUsuario():Usuario{
        return new Usuario()
    }

    public login(login:string, password:string):Observable<any>{
        return new Observable()
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




