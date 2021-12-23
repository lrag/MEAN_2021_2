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
      idUsuario : formBuilder.control(''),
      nombre    : formBuilder.control('', [ Validators.required ]),
      direccion : formBuilder.control('', [ Validators.required ]),
      telefono  : formBuilder.control('', [ Validators.required ]),
      correoE   : formBuilder.control('', [ Validators.required, Validators.email ]),        
    })

    this.listarContactos()
  }
  
  private async listarContactos():Promise<any>{   
    try {
      this.contactos = await this.contactosService.listar()
    } catch (error) {
      this.mensajeError = "Hubo un problema en el servidor"
    }
    /*
    this.contactosService.listar()
      .then( contactos => this.contactos = contactos )
      .catch( err => this.mensajeError = "Hubo un problema en el servidor")
    */
  }

  ngOnInit(): void {
  }

  public async insertar():Promise<any>{
    console.log("Insertar contacto")

    //Validaciones...    
    this.formulario.markAllAsTouched()
    if(this.formulario.invalid){
      return
    }

    try{
      await this.contactosService.insertar(this.formulario.value)
      this.listarContactos()  
      this.mensaje = "El contacto se insertó correctamente"  
      this.vaciarFormulario()
    } catch (error) {
      this.mensaje = ""
      this.mensajeError = "Hubo un problema al insertar el contacto"
    }
  }
  
  public modificar():void{
    console.log("Modificar contacto")
  }
  
  public borrar():void{
    console.log("Borrar contacto")
  }
  
  public vaciarFormulario():void{
    console.log("Vaciar formulario")
    this.formulario.setValue(new Contacto())
  }

  public async seleccionar(_id:string):Promise<any>{
    console.log("Seleccionar:"+_id)   

    try {
      let contacto:Contacto = await this.contactosService.buscarPorId(_id)
      console.log(contacto)
      this.formulario.setValue(contacto) //ZASCA
    } catch (error:any) {
      console.log(error)
      this.mensaje = ""
      this.mensajeError = error.message
    }

  }  

}
