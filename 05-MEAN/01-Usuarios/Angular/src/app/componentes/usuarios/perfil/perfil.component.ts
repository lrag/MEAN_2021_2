import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public formulario:FormGroup

  public mensaje:string|null = null
  public mensajeError:string|null = null

  constructor(private formBuilder:FormBuilder,
              private autenticacionService:AutenticacionService) {

    this.formulario = formBuilder.group({
      _id       : formBuilder.control(''), //Este no aparece en el formulario, pero hace falta
      nombre    : formBuilder.control('', [ Validators.required ]),
      login     : formBuilder.control(''), //Este no aparece en el formulario, pero hace falta
      password  : formBuilder.control('', [ Validators.required, Validators.minLength(10) ]),
      idioma    : formBuilder.control(''),
      correoE   : formBuilder.control('', [ Validators.required, Validators.email ]),
      telefono  : formBuilder.control('', [ Validators.required ]),    
      direccion : formBuilder.control('', [ Validators.required ]),    
      rol       : formBuilder.control('') //Este no aparece en el formulario, pero hace falta  
    })

    /*
    let json:any = sessionStorage.getItem("usuario")
    let usuario:Usuario = JSON.parse(json)
    usuario.password = ""
    this.formulario.setValue(usuario)
    */
    let usuario:Usuario = autenticacionService.getUsuario()
    this.formulario.setValue(usuario)
    

  }

  ngOnInit(): void {
  }

  public guardar():void{

    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

  }

}
