import { Component, OnInit } from '@angular/core';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  public login   :string = ""
  public password:string = ""

  public mensaje :string = ""

  constructor(private autenticacionService:AutenticacionService) { 
  }

  ngOnInit(): void {
  }

  public entrar():void{
    console.log(this.login+":"+this.password)
    this.autenticacionService.login(this.login, this.password)
      .subscribe(
        respuesta => {
          console.log("OK",respuesta)
          //Navegar
        },
        error => {
          console.log("MAL",error)
          this.mensaje = "Credenciales incorrectas"
        }
      )
  }

}
