import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  
  public errorPassword:boolean = false

  public formulario:FormGroup /*= new FormGroup({
    nombre            : new FormControl('', [ Validators.required ]),
    login             : new FormControl('', [ Validators.required ]),
    password          : new FormControl('', [ Validators.required ]),
    confirmarPassword : new FormControl('', [ Validators.required ]),
    correoE           : new FormControl('', [ Validators.required ]),        
    idioma            : new FormControl('', [ Validators.required ])        
  })*/

  constructor(formBuilder:FormBuilder,
              private router:Router) {

    this.formulario = formBuilder.group({
      nombre   : formBuilder.control('', [ Validators.required ]),
      login    : formBuilder.control('', [ Validators.required ]),
      password : formBuilder.control('', [ Validators.required ]),
      confirmarPassword : formBuilder.control('', [ Validators.required ]),
      correoE  : formBuilder.control('', [ Validators.required, Validators.email ]),        
      idioma   : formBuilder.control('', [ Validators.required ])        
    })

    let usuarioGuardadoJson = sessionStorage.getItem("registro")
    if(usuarioGuardadoJson){
      let usuarioGuardado = JSON.parse(usuarioGuardadoJson)
      usuarioGuardado.password = ""
      usuarioGuardado.confirmarPassword = ""
      this.formulario.setValue(usuarioGuardado)
    }

  }

  ngOnInit(): void {
  }

  public siguiente():void{

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

    //Guardamos la informacion del formulario para que se pueda utilizar en la pantalla de aceptación de terminos
    sessionStorage.setItem("registro",JSON.stringify(registro))

    this.router.navigateByUrl("/aceptacion")
  }

  public cancelar():void{
    sessionStorage.removeItem("registro")
    this.router.navigateByUrl("/")
  }

}
