import { Injectable } from "@angular/core";
import { Pedido } from "../entidades/pedido";
import { Usuario } from "../entidades/usuario";
import { AutenticacionService } from "./autenticacion-service";

@Injectable({ providedIn : 'root' })
export class CestaService {

    private subscription:any
    private cesta:Pedido
    private usuario:Usuario

    public constructor(autenticacionService:AutenticacionService){

        console.log("Creando CestaService")

        //Obtenemos el usuario que está autenticado
        this.usuario = autenticacionService.getUsuario()

        let json:string|null = localStorage.getItem("cesta_"+this.usuario._id)
        let cesta:any 
        if(json){
            cesta = JSON.parse(json)
            //cesta no tiene el prototipo de la clase Pedido y no cuenta con las funciones
            //Le asignamos el prototipo de Pedido
            Object.setPrototypeOf(cesta, Pedido.prototype)
        } else {
            cesta = new Pedido()
            console.log(JSON.stringify(cesta))
            localStorage.setItem("cesta_"+this.usuario._id,JSON.stringify(cesta))
        }

        //Aqui cestaService se subscribe a los cambios en la cesta
        this.subscription = cesta
            .getSubject()
            .subscribe(
                (evento: Pedido) => {
                    console.log("CestaService: Cambio en la cesta!")
                    console.log(evento)
                    this.guardarCesta(evento)
                }
            )
        
        //cesta.setCestaService(this)
        this.cesta = cesta
    }

    public getCesta():Pedido{
        return this.cesta            
    }

    public guardarCesta(cesta:any):void{
        let x:any = cesta.subject
        cesta.subject = null
        localStorage.setItem("cesta_"+this.usuario._id, JSON.stringify(cesta))
        cesta.subject = x
    }

    public crearCesta():void{
        this.cesta = new Pedido()
        this.guardarCesta(this.cesta)

        this.subscription.unsubscribe()
        this.subscription = this.cesta
            .getSubject()
            .subscribe(
                (evento: Pedido) => {
                    console.log("CestaService: Cambio en la cesta!")
                    console.log(evento)
                    this.guardarCesta(evento)
                }
            )        
    }

}