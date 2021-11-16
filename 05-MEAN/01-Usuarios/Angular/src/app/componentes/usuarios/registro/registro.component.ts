import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {
  
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
      correoE  : formBuilder.control('', [ Validators.required ]),        
      idioma   : formBuilder.control('', [ Validators.required ])        
    })

  }

  ngOnInit(): void {
  }

  public siguiente():void{

    //Validaciones...

    if(this.formulario.invalid){
      console.log("INVALIDO")
      return
    }

    let registro = this.formulario.value
    let usuario:Usuario = new Usuario()
    usuario.nombre   = registro.nombre
    usuario.login    = registro.login
    usuario.password = registro.password
    usuario.idioma   = registro.idioma
    usuario.correoE  = registro.correoE

    console.log(usuario)

    //Guardamos la informacion del formulario para que se pueda utilizar en la pantalla de aceptación de terminos
    sessionStorage.setItem("usuario",JSON.stringify(usuario))

    this.router.navigateByUrl("/aceptacion")
  }

}
