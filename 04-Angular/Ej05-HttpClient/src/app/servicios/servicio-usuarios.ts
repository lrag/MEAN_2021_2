import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';

@Injectable( { providedIn : 'root' } )
export class ServicioUsuarios {

    public constructor(private httpClient:HttpClient){
    }

    public listarUsuarios():void {
        this.httpClient.get("https://reqres.in/api/users")
    }

}