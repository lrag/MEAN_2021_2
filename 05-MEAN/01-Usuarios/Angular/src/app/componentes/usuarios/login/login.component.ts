import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public login   :string = ""
  public password:string = ""
  public mensaje :string = ""

  constructor(private autenticacionService:AutenticacionService,
              private router:Router) { 
  }

  ngOnInit(): void {
  }

  public entrar():void{
    console.log(this.login+":"+this.password)
    this.autenticacionService.login(this.login, this.password)
      .subscribe(
        () => {
          console.log("OK")
          //Delegaremos esto en el servicio, para que esté en él centralizado todo lo relacionado con la autenticación
          //sessionStorage.setItem("JWT",respuesta.jwt)
          //sessionStorage.setItem("usuario",JSON.stringify(respuesta.usuario))
          
          //Navegar
          this.router.navigateByUrl("/tienda")
        },
        error => {
          console.log("MAL",error)
          this.mensaje = "Credenciales incorrectas"
        }
      )
  }

}
