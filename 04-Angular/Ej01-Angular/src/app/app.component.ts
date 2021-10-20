import { Component } from '@angular/core';
import { Pelicula } from './entidades/pelicula';

@Component({
  selector: 'app-root',
  //template: '<h1>Hay que estar muy mal de la cabeza para incluir la plantilla en el decorador</h1>',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']   //Opcional.
})
export class AppComponent {

  public mensaje:string = "Hola que tal"
  public numero1:number = 10
  public numero2:number = 20  

  //Con bidirectional binding podremos asociar el 'value' de un elemento de la vista con 
  //una propiedad del componente
  //public titulo:string   = ""  
  //public director:string = ""
  //public year:number     = 0
  //Mucho mejor con un objeto del tipo película:
  public pelicula:Pelicula = new Pelicula()

  public insertarPelicula():void {
    console.log("Insertando película...")
    console.log("Titulo  :"+this.pelicula.titulo)
    console.log("Director:"+this.pelicula.director)
    console.log("Año     :"+this.pelicula.year)

  }
  
  public vaciarFormulario():void{
    console.log("Vaciando el formulario...")
  }

}
