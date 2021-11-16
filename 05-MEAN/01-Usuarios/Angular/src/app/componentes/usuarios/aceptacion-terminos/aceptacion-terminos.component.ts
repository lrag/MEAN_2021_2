import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aceptacion-terminos',
  templateUrl: './aceptacion-terminos.component.html'
})
export class AceptacionTerminosComponent implements OnInit {

  public acepta:boolean = false
  public mensaje:string = ""

  constructor() { }

  ngOnInit(): void {
  }

  public registrar():void{

    if(!this.acepta){
      this.mensaje = "Debe aceptar los terminos"
      return
    }

    console.log("ACEPTA")

  }

}
