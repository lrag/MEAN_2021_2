import { Injectable, OnDestroy } from "@angular/core";
import { Pedido } from "../entidades/pedido";
import { Usuario } from "../entidades/usuario";
import { AutenticacionService } from "./autenticacion-service";

@Injectable(/*{ providedIn : 'root' }*/)
export class CestaService implements OnDestroy {

    private subscription:any
    private cesta:Pedido
    private usuario:Usuario

    public constructor(autenticacionService:AutenticacionService){
        console.log("Creando CestaService")

        //Obtenemos el usuario que está autenticado
        this.usuario = autenticacionService.getUsuario()

        let json:string|null = localStorage.getItem("cesta_"+this.usuario._id)
        let cesta:Pedido = new Pedido()
        if(json){
            //En el local storage tenemos solo los detalles, no una cesta entera
            let detallesCesta = JSON.parse(json)
            cesta.detalles = detallesCesta.detalles
            cesta.total = detallesCesta.total
        } else {
            console.log("==================================")
            console.log("Creando cesta en LocalStorage")
            this.guardarCesta(cesta)
        }
        
        this.cesta = cesta
        
        //Aqui cestaService se subscribe a los cambios en la cesta
        this.subscribirseALosCambiosEnLaCesta()
    }

    public ngOnDestroy(){
        console.log("ADIOS MUNDO CRUEL")
        //Cancelamos la subscripción que tenemos con la cesta
        console.log("==================================")
        console.log("Cancelando subscripción a la cesta")        
        this.subscription.unsubscribe()
    }

    public getCesta():Pedido{
        return this.cesta            
    }

    public guardarCesta(cesta:any):void{
        //No vamos a guardar la cesta entera en el local storage porque incluye datos del usuario
        //Guardaremos únicamente el array de detalles y el total
        let detallesCesta = {
            detalles : cesta.detalles,
            total    : cesta.total
        }
        localStorage.setItem("cesta_"+this.usuario._id, JSON.stringify(detallesCesta))
    }

    public crearCesta():void{
        //Cancelamos la subscripción a la cesta antígua
        this.subscription.unsubscribe()
        //Creamos la nueva cesta
        this.cesta = new Pedido()
        //Guardamos la cesta
        this.guardarCesta(this.cesta)
        console.log("==================================")
        console.log("Cancelando subscripción a la cesta")
        //Nos subscribimos a la nueva cesta
        this.subscribirseALosCambiosEnLaCesta()      
    }

    private subscribirseALosCambiosEnLaCesta():void{
        this.subscription = this.cesta
            .getSubject()
            .subscribe(
                (evento: Pedido) => {
                    console.log("==================================")
                    console.log("CestaService: Cambio en la cesta!")
                    console.log(evento)
                    this.guardarCesta(evento)
                }
            )          
    }

}