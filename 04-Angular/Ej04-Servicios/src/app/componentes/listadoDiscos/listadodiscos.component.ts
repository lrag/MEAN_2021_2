import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';
import { ServicioDiscos } from 'src/app/servicios/servicioDiscos';

let discos:Disco[] = []


@Component({
  selector: 'app-listadodiscos',
  templateUrl: './listadodiscos.component.html',
  //providers: [ ServicioDiscos ],
})
export class ListadoDiscosComponent implements OnInit {

  public discos:Disco[] = []

  constructor(servicioDiscos:ServicioDiscos) { 
    console.log("instanciando ListadoDiscosComponent")
    this.discos = servicioDiscos.listar()
  }

  ngOnInit(): void {
  }

}
