import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  
  public errorPassword:boolean = false

  public formulario:FormGroup 

  constructor(formBuilder:FormBuilder,
              private autenticacionService:AutenticacionService) {

    this.formulario = formBuilder.group({
      email    : formBuilder.control('', [ Validators.required, Validators.email ]),        
      nombre   : formBuilder.control('', [ Validators.required ]),
      password : formBuilder.control('', [ Validators.required ]),
      confirmarPassword : formBuilder.control('', [ Validators.required ]),
    })

  }

  ngOnInit(): void {
  }

  public registro():void{

    //Validaciones...    
    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

    //Accedemos a los valores del formulario
    let registro = this.formulario.value
    if(registro.password!=registro.confirmarPassword){
      this.errorPassword = true
      return //pa no seguir
    }   

    this.autenticacionService.altaUsuario(registro)
    .subscribe( 
      () => console.log("OK"),
      err => console.log(err)
    )

  }

}
