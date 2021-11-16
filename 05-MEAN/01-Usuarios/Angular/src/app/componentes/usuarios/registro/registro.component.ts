import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})
export class RegistroComponent implements OnInit {

  public formulario:FormGroup

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

    console.log("Invalid:", this.formulario.invalid)


    let registro = this.formulario.value
    console.log("Value:",registro)


    //Guardamos la informacion del formulario para que se pueda utilizar en la pantalla de aceptación de terminos
    //sessionStorage.setItem("usuario",blablabla)

    //this.router.navigateByUrl("/aceptacion")
  }

}
