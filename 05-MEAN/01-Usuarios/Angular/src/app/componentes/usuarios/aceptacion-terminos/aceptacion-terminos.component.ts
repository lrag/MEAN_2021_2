import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-aceptacion-terminos',
  templateUrl: './aceptacion-terminos.component.html'
})
export class AceptacionTerminosComponent implements OnInit {

  public acepta:boolean = false
  public mensaje:string = ""

  constructor(private autenticacionService:AutenticacionService,
              private router:Router) {
  }

  ngOnInit(): void {
  }

  public registrar():void{

    if(!this.acepta){
      this.mensaje = "Debe aceptar los terminos"
      return
    }


    let json = sessionStorage.getItem("usuario")
    if(!json){
      return
    }
    let usuario:Usuario = JSON.parse(json)

    console.log(usuario)

    this.autenticacionService.altaUsuario(usuario)
    .subscribe(
      respuesta => { 
        console.log(respuesta)
        //retirar al usuario del sessionStorage (tiene el password en limpio!!!!)
        sessionStorage.removeItem("usuario")
        //Navegar a login
        this.router.navigateByUrl("/")
      },
      error => { 
        console.log(error)
        this.mensaje = error.error.mensaje 
      }
    )

  }

}
