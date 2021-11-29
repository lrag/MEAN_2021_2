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

  public comprobarIntro(evento:any){
    if(evento.keyCode == 13){
      this.entrar()
    }
  }

  public entrar():void{
    console.log(this.login+":"+this.password)
    this.autenticacionService.login(this.login, this.password)
      .subscribe(
        () => {
          this.router.navigateByUrl("/tienda")
        },
        error => {
          this.mensaje = "Credenciales incorrectas"
        }
      )
  }

}
