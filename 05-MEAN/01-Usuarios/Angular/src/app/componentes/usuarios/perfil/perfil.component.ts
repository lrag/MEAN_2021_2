import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html'
})
export class PerfilComponent implements OnInit {

  public formulario:FormGroup

  public mensaje:string|null = null
  public mensajeError:string|null = null

  constructor(private formBuilder:FormBuilder) {

    this.formulario = formBuilder.group({
      _id       : formBuilder.control(''),
      nombre    : formBuilder.control('', [ Validators.required ]),
      login     : formBuilder.control(''),
      password  : formBuilder.control('', [ Validators.required, Validators.minLength(10) ]),
      idioma    : formBuilder.control(''),
      correoE   : formBuilder.control('', [ Validators.required, Validators.email ]),
      telefono  : formBuilder.control('', [ Validators.required ]),    
      direccion : formBuilder.control('', [ Validators.required ]),    
    })

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
