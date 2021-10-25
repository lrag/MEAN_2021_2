
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html'
})
export class Componente1Component implements OnInit {

  public valor1:string = "HOLA"
  public valor2:string = "HOLO, que es más gordo"

  constructor(private router:Router) {
    console.log("Creando Componente1")
  }

  ngOnInit(): void {
  }

  public navegacionProgramatica():void{

    //Esto es análogo a cuando en la vista utilizamos '[routerLink]'
    this.router.navigate([ '/componente2', this.valor1, this.valor2])

    //Esto es aálogo a cuando en la vista utilizamos 'routerLink'
    //this.router.navigateByUrl('/componente2/444/hola radiola')

  }

}


