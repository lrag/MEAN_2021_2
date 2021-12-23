import { Injectable } from "@angular/core";
import { HttpClient } from '@Angular/common/http';
import { ConfiguracionUtil } from "./configuracion-util";
import { Observable } from "rxjs";
import { AutenticacionService } from "./autenticacion-service";

@Injectable({ providedIn : 'root' })
export class ProductosService{

    public constructor(private httpClient:HttpClient, 
                       private autenticacionService:AutenticacionService ){
    }

    public listarProductos(/*criterio*/):Observable<any>{
        let JWT = this.autenticacionService.getJWT()
        //InterceptorJWT se encargará de añadir el header authorization
        //return this.httpClient.get(ConfiguracionUtil.urlServidor+"/productos", 
        //                           { headers : { Authorization : "Bearer "+JWT } })
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/productos")
    }

    public getImage(imageUrl:string): Observable<Blob> {
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/"+imageUrl, { responseType: 'blob' });
    }

}