import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html'
})
export class DiscosComponent implements OnInit {

  public disco:Disco = new Disco()
  public discos:Disco[] = []

  constructor() { }

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
  }

  public vaciar():void{
    console.log("Vaciando...")    
    this.disco = new Disco()
  }

}
