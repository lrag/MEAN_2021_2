import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";

@Injectable({ providedIn : 'root' })
export class CestaService {

    private cesta:Pedido

    public constructor(){

        let json:string|null = localStorage.getItem("cesta")
        let cesta:any 
        if(json){
            cesta = JSON.parse(json)
            //cesta no tiene el prototipo de la clase Pedido y no cuenta con las funciones
            //Le asignamos el prototipo de Pedido
            Object.setPrototypeOf(cesta, Pedido.prototype)
        } else {
            cesta = new Pedido()
            console.log(JSON.stringify(cesta))
            localStorage.setItem("cesta",JSON.stringify(cesta))
        }

        cesta
            .getSubject()
            .subscribe(
                (cesta: any) => {
                    console.log("Cambio en la cesta!")
                    console.log(cesta)
                }
            )

        
        //Aqui cestaService se subscribe a los cambios en la cesta
        
        //cesta.setCestaService(this)
        this.cesta = cesta
    }

    public getCesta():Pedido{
        return this.cesta            
    }

    public guardarCesta(cesta:any):void{
        delete cesta.cestaService
        localStorage.setItem("cesta", JSON.stringify(cesta))
        cesta.cestaService = this
    }

    public crearCesta():void{
    }

}