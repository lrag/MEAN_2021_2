import { HttpClient } from '@Angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable( { providedIn : 'root' } )
export class ServicioUsuarios {

    public constructor(private httpClient:HttpClient){
    }

    public listarUsuarios():Observable<any> {
        return this.httpClient.get("https://reqres.in/api/users")
    }

}