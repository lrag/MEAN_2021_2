import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-componente2',
  templateUrl: './componente2.component.html'
})
export class Componente2Component implements OnInit {

  public dato1:string
  public dato2:string

  //INYECCIÓN DE DEPENDENCIAS EN ANGULAR
  //
  //Podemos solicitar en el constructor de un compomente que nos inyecten objetos 
  
  //ActivatedRoute es una clase cuyas instancias representan a la ruta presente en la barra
  //de navegación
  constructor(ruta:ActivatedRoute) { 
    console.log("Creando Componente2")

    //Accedemos a los valores contenidos en la ruta
    //ruta.snapshot.params['dato1']
    this.dato1 = ruta.snapshot.params.dato1
    this.dato2 = ruta.snapshot.params.dato2
  }

  ngOnInit(): void {
  }

}
