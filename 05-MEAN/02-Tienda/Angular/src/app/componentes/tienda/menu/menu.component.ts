import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit, OnDestroy {
 
  private subscripcion:any
  public usuario:Usuario|null = null

  constructor(private router:Router,
              private autenticacionService:AutenticacionService) {
    this.subscripcion = this.autenticacionService
      .getSubjectUsuario()
      .subscribe(
        (evento:Usuario) => {
            console.log("Cambio en el usuario!") //, evento)
            this.usuario = evento
        }
      ) 
      
  }
     
  //Callbacks
  //Este es invocado cuando el componente ya es visible:
  ngOnInit(): void {      
  }

  //Este es invocado cuando el componente va a ser eliminado
  ngOnDestroy():void {
    console.log("Adios mundo cruel")
    this.subscripcion.unsubscribe()
  }

  public logout():void{
    this.autenticacionService.logout()
    this.router.navigateByUrl("/")
    //window.location.href = "/"
  }

}
