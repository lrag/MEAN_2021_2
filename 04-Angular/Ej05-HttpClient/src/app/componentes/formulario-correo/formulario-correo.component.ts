import { Component, OnInit } from '@angular/core';
import { CorreoElectronico } from 'src/app/entidades/correo-electronico';
import { ServicioUsuarios } from 'src/app/servicios/servicio-usuarios';

@Component({
  selector: 'app-formulario-correo',
  templateUrl: './formulario-correo.component.html'
})
export class FormularioCorreoComponent {

  public usuarios:any[] = []
  public correoElectronico:CorreoElectronico = new CorreoElectronico()

  public constructor(private servicioUsuarios:ServicioUsuarios){
    this.listarUsuarios()
  }

  public listarUsuarios():void{
    this.servicioUsuarios.listarUsuarios()
    .subscribe(
      respuesta => this.usuarios = respuesta.data,
      error => console.log(error)
    )
  }

  public enviar():void{
    console.log("Enviando el correo...")
    console.log(this.correoElectronico)
  }

}
