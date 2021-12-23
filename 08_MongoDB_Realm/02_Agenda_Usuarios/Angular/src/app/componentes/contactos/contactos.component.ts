import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contacto } from 'src/app/entidades/contacto';
import { ContactosService } from 'src/app/servicios/contactos-service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html'
})
export class ContactosComponent implements OnInit {

  public mensaje      : string = ""
  public mensajeError : string = ""
  public formulario   : FormGroup
  public contactos    : Contacto[] = []

  public constructor(formBuilder:FormBuilder,
                     private contactosService:ContactosService) { 
    this.formulario = formBuilder.group({
      _id       : formBuilder.control(''),
      nombre    : formBuilder.control('', [ Validators.required ]),
      direccion : formBuilder.control('', [ Validators.required ]),
      telefono  : formBuilder.control('', [ Validators.required ]),
      correoE   : formBuilder.control('', [ Validators.required, Validators.email ]),        
    })

    this.listarContactos()
  }
  
  private listarContactos():void{    
    this.contactosService.listar()
  }

  ngOnInit(): void {
  }

  public insertar():void{
    console.log("Insertar contacto")
  }
  
  public modificar():void{
    console.log("Modificar contacto")
  }
  
  public borrar():void{
    console.log("Borrar contacto")
  }
  
  public vaciar():void{
    console.log("Vaciar formulario")
    this.formulario.setValue(new Contacto())
  }

}
