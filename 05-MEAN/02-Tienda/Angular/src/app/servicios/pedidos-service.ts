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
        delete pedido.subject 
        
        //InterceptorJWT se encargará de añadir el header authorization
        //return this.httpClient.post(
        //    ConfiguracionUtil.urlServidor+"/ordenesCompra", 
        //    pedido, 
        //    { headers : { Authorization : "Bearer "+JWT } }
        return this.httpClient.post(ConfiguracionUtil.urlServidor+"/ordenesCompra", pedido)
    }

    public listarPedidos():Observable<any>{
        let JWT = this.autenticacionService.getJWT()
        let idUsuario = this.autenticacionService.getUsuario()._id
        return this.httpClient.get(ConfiguracionUtil.urlServidor+"/clientes/"+idUsuario+"/pedidos")
    }    

}