import { Component, OnInit } from '@angular/core';
import { CorreoElectronico } from 'src/app/entidades/correo-electronico';
import { HttpClient } from '@Angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-formulario-correo',
  templateUrl: './formulario-correo.component.html'
})
export class FormularioCorreoComponent {

  public usuarios:any[] = []
  public correoElectronico:CorreoElectronico = new CorreoElectronico()

  public constructor(private httpClient:HttpClient){
    this.listarUsuarios()
  }

  public listarUsuarios():void{
    let observable:Observable<any> = this.httpClient.get("https://reqres.in/api/users")
    observable.subscribe(
      respuesta => this.usuarios = respuesta.data,
      error => console.log(error)
    )
  }

  public enviar():void{
    console.log("Enviando el correo...")
    console.log(this.correoElectronico)
  }


}
