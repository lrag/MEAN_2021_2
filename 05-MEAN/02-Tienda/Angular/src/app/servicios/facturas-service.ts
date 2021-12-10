import { Injectable } from "@angular/core";
import { HttpClient } from '@Angular/common/http';
import { ConfiguracionUtil } from "./configuracion-util";
import { Observable } from "rxjs";
import { AutenticacionService } from "./autenticacion-service";

@Injectable({ providedIn : 'root' })
export class FacturasService{

    public constructor(private httpClient:HttpClient, 
                       private autenticacionService:AutenticacionService ){
    }

    public listarFacturas():Observable<any>{
        let JWT = this.autenticacionService.getJWT()
        let idUsuario = this.autenticacionService.getUsuario()._id
        //InterceptorJWT se encargará de añadir el header authorization
        //return this.httpClient.get(ConfiguracionUtil.urlServidor+"/clientes/"+idUsuario+"/facturas", 
        //                           { headers : { Authorization : "Bearer "+JWT } })
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/clientes/"+idUsuario+"/facturas")
    }

}