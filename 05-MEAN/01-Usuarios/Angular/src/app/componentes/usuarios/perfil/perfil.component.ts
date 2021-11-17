import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacionService';
import { SessionService } from 'src/app/servicios/sessionService';
import { UsuariosService } from 'src/app/servicios/usuariosService';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public formulario:FormGroup

  public mensaje:string
  public mensajeError:string

  constructor(private formBuilder:FormBuilder,
              private autenticationService:AutenticacionService) {

    let usuario:Usuario = autenticationService.getUsuario()
    
    this.formulario = formBuilder.group({
      _id       : formBuilder.control(usuario._id),
      nombre    : formBuilder.control(usuario.nombre,    [ Validators.required ]),
      login     : formBuilder.control(usuario.login),
      pw        : formBuilder.control(usuario.pw,        [ Validators.required, Validators.minLength(10) ]),
      idioma    : formBuilder.control(usuario.idioma),
      correoE   : formBuilder.control(usuario.correoE,   [ Validators.required, Validators.email ]),
      telefono  : formBuilder.control(usuario.telefono,  [ Validators.required ]),    
      direccion : formBuilder.control(usuario.direccion, [ Validators.required ]),    
    })

  }

  ngOnInit(): void {
  }

  public guardar():void{

    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

    this.autenticationService.modificarUsuario(this.formulario.value)
    .subscribe(
      () => { this.mensaje = 'El perfil se modificó correctamente' },
      () => { this.mensajeError = 'Hubo un problema en el servidor' }
    )

  }

}
