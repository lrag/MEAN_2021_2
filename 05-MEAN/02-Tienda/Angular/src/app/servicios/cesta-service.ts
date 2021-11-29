import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";

@Injectable({ providedIn : 'root' })
export class CestaService {

    private cesta:Pedido = new Pedido()

    public constructor(){

        let json:string|null = localStorage.getItem("cesta")
        let cesta:any 
        console.log("JSON:",json)
        if(json){
            cesta = JSON.parse(json)
        } else {
            cesta = new Pedido()
            console.log(JSON.stringify(cesta))
            localStorage.setItem("cesta",JSON.stringify(cesta))
        }

    }

    public getCesta():Pedido{
        return this.cesta            
    }

    public crearCesta():void{
    }

}