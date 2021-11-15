import { Injectable } from "@angular/core";
import { Disco } from "../entidades/disco";

//Los servicios deben tener el decorador @Injectable
//
//Los servicios deben ser registrados para que puedan inyectarse

@Injectable( { providedIn : 'root' } )
export class DiscosService {

    private discos:Disco[] = []

    //En el constructor de un servicio tambien podemos solicitar la inyección de dependencias
    public constructor(){
        console.log("Creando una instancia de DiscosService")
    }

    public listarDiscos():Disco[]{
        //Devolvemos un clon del array
        //Nos permitimos la licencia de hacerlo con JSON
        //Si los discos tuvieran funciones se perderían
        let discosAux:Disco[] = JSON.parse(JSON.stringify(this.discos))
        return discosAux
    }

    public buscarDisco(id:number):Disco{        
        for(let d of this.discos){
            if(d.id == id){
                return JSON.parse(JSON.stringify(d))
            }
        }
        return null
    }

    public insertarDisco(disco:Disco):void{
        disco.id = Date.now()
        this.discos.push(disco)
    }

    public modificarDisco(disco:Disco):void{
        for(let a=0; a<this.discos.length; a++){
            if(this.discos[a].id == disco.id){
                this.discos[a] = disco
                return
            }
        }
    }
    
    //public borrarDisco(id:Number):void //Esto también está bien
    public borrarDisco(disco:Disco):void{
        for(let a=0; a<this.discos.length; a++){
            if(this.discos[a].id == disco.id){
                this.discos.splice(a,1)
                return
            }
        }
    }

}