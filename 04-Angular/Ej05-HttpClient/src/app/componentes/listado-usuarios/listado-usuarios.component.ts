import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html'
})
export class ListadoUsuariosComponent implements OnInit {

  public usuarios:any[] = []

  constructor() { }

  ngOnInit(): void {
  }

  public listarUsuarios():void{

  }

}
