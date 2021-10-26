import { Injectable } from "@angular/core";
import { Disco } from "../entidades/disco";

//Los servicios en Angular se inyectan
//Jamás los crearemos con 'new'
//Deben tener el decorador '@Injectable
//Hay que registrarlos
//-a nivel del módulo
//-a nivel de un componente
//-aqui mismo, en el decorador (equivalente a registrarlo a nivel de modulo)
@Injectable()
export class ServicioDiscos {

    private discos:Disco[] = []

    constructor(){
        console.log("Instanciando ServicioDiscos")
    }


    public listar():Disco[]{
        return this.discos
    }

    public buscarPorId(_id:number):Disco|null{        
        let discoEncontrado:Disco|null = null        
        for(let disco of this.discos){
            if(disco._id == _id){
                discoEncontrado = disco
                break
            }
        }        
        return discoEncontrado
    }

    public insertar(disco:Disco):void{
        this.discos.push(disco)
    }

    public modificar(disco:Disco):void{

    }

    public borrar(disco:Disco):void{

    }

}