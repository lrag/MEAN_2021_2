import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
 
  public usuario:Usuario|null = null

  constructor(private autenticacionService:AutenticacionService) {
    this.usuario = autenticacionService.getUsuario()
  }

  ngOnInit(): void {
  }

}
