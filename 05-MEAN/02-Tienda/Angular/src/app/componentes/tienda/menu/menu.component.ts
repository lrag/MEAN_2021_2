import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
 
  public usuario:Usuario|null = null

  constructor(private router:Router,
              private autenticacionService:AutenticacionService) {
    
    //this.usuario = autenticacionService.getUsuario()

    autenticacionService
      .getSubjectUsuario()
      .subscribe(
        (evento:Usuario) => {
          console.log("Cambio en el usuario!", evento)
          this.usuario = evento
        }
      )

  }

  ngOnInit(): void {
  }

  public logout():void{
    this.autenticacionService.logout()
    this.router.navigateByUrl("/")
  }

}
