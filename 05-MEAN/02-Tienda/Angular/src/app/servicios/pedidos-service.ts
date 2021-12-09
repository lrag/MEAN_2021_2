import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";
import { HttpClient } from '@Angular/common/http';
import { ConfiguracionUtil } from "./configuracion-util";
import { AutenticacionService } from "./autenticacion-service";
import { Observable } from "rxjs";

@Injectable({ providedIn : 'root' })
export class PedidosService {

    public constructor(private httpClient:HttpClient,
                       private autenticacionService:AutenticacionService){
    }

    public comprar(pedido:any):Observable<any> {
        let JWT = this.autenticacionService.getJWT()        
        pedido.usuario = this.autenticacionService.getUsuario()
        console.log(pedido)
        delete pedido.subject //
        return this.httpClient.post(
            ConfiguracionUtil.urlServidor+"/ordenesCompra", 
            pedido, 
            { headers : { Authorization : "Bearer "+JWT } }
        )

    }

}