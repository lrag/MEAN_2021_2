import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";

@Injectable({ providedIn : 'root' })
export class CestaService {

    private cesta:Pedido = new Pedido()

    public constructor(){
    }

    public getCesta():Pedido{
        return this.cesta            
    }

    public crearCesta():void{
    }

}