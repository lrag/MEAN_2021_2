import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html'
})
export class DiscosComponent implements OnInit {

  public disco:Disco = new Disco()
  public discos:Disco[] = []

  constructor() { 
    //Pa que haya datos na más empezar
    this.discos.push( new Disco(1,"1","2",3,"4","5") )
    this.discos.push( new Disco(2,"11","22",33,"44","55") )
    this.discos.push( new Disco(3,"111","222",333,"444","555") )
  }

  ngOnInit(): void {
  }
  
  public insertar():void{
    console.log("Insertando...")

    this.discos.push(this.disco)
    this.vaciar()
  }

  public modificar():void{
    console.log("Modificando...")
  }

  public borrar():void{
    console.log("Borrando...")

    for(let a=0; a<this.discos.length; a++){
      if( this.discos[a]._id == this.disco._id){
        this.discos.splice(a,1)
        break;
      }
    }
    this.vaciar()
  }

  public vaciar():void{
    console.log("Vaciando...")     
    this.disco = new Disco()
  }
  
  public seleccionar(disco:Disco):void{
    console.log("Seleccionando...")
  
    /*
    for(let d of this.discos){
      if(d._id == disco._id){
        //this.disco.titulo = d.titulo
        //this.disco.grupo = d.grupo
        //this.disco.year = d.year
        //this.disco.genero = d.genero
        //this.disco.notas = d.notas
        this.disco = d
      }
    }
    */

    let copia:Disco = new Disco(disco._id, disco.titulo, disco.grupo, disco.year, disco.genero, disco.notas)

    this.disco = copia

  }

}



let disco = new Disco(1,"1","2",3,"4","5")
let copia = disco

copia.titulo = "TDSOTM"
console.log(disco)
