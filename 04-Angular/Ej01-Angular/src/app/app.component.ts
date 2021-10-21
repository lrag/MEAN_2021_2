import { Component } from '@angular/core';
import { Disco } from './entidades/disco';

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
  public disco:Disco = new Disco()

  public discos:Disco[] = []

  public insertarDisco():void {

    console.log("Insertando disco...")
    console.log("Titulo  :"+this.disco.titulo)
    console.log("Director:"+this.disco.grupo)
    console.log("Año     :"+this.disco.year)

    this.discos.push(this.disco) //Cuidado no vayamos a insertar siempre el mismo objeto!
    this.disco = new Disco()     //Creamos un nuevo disco para la próxima

    console.log(this.discos)
  }
  
  public vaciarFormulario():void{
    console.log("Vaciando el formulario...")

    //Opción #1
    //this.disco.titulo = null
    //this.disco.grupo  = null
    //this.disco.year   = null

    //Opción #1 bis
    //this.disco.vaciar()

    //Opción #2
    this.disco = new Disco()
  }

}
