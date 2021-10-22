import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html'
})
export class DiscosComponent implements OnInit {

  public disco:Disco|null = new Disco()


  constructor() { }

  ngOnInit(): void {
  }

  public insertar():void{
    console.log("Insertando...")
  }

  public modificar():void{
    console.log("Modificando...")
  }

  public borrar():void{
    console.log("Borrando...")
  }

  public vaciar():void{
    console.log("Vaciando...")
  }

}
