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

    let json:any = sessionStorage.getItem("registro")
    let registro = JSON.parse(json)
    let usuario:Usuario = new Usuario()
    usuario.nombre   = registro.nombre
    usuario.login    = registro.login
    usuario.password = registro.password
    usuario.idioma   = registro.idioma
    usuario.correoE  = registro.correoE

    this.autenticacionService.altaUsuario(usuario)
    .subscribe(
      respuesta => { 
        console.log(respuesta)
        //retirar al usuario del sessionStorage (tiene el password en limpio!!!!)
        sessionStorage.removeItem("registro")
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
