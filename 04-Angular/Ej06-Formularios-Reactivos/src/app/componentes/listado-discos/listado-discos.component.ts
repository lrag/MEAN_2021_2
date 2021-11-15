import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';
import { DiscosService } from 'src/app/servicios/discos.service';

@Component({
  selector: 'app-listado-discos',
  templateUrl: './listado-discos.component.html',
  //providers: [ DiscosService ]
})
export class ListadoDiscosComponent implements OnInit {

  public discos:Disco[] //undefined

  //Los servicios se inyectan
  //JAMAS CREAREMOS UN SERVICIO CON NEW
  constructor(private discosService:DiscosService) {
    console.log("Creando una instancia de ListadoDiscosComponent")
    this.discos = discosService.listarDiscos()
  }

  ngOnInit(): void {
  }

}
