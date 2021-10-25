
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-componente1',
  templateUrl: './componente1.component.html'
})
export class Componente1Component implements OnInit {

  public valor:string = "HOLO, que es más gordo"

  //Inyección de dependencias en Angular
  //Si el constructor de un componente (o un servicio) recibe parámetros Angular intentará proporcionarlos
  //al crear la instancia
  //Hay una lista concreta de cosas que podemos pedir
  //y si no incamos el tipo angular no sabrá qué pedimos
  //-Router: objeto que sirve para 'navegar'
  //-ActivatedRoute: objeto que representa la ruta que hay ahora mismo en la barra de navegacion
  //-HttpClient: objeto que sirve para enviar peticiones AJAX
  //-Otros componentes presentes en la pagina
  //-Servicios 
  //-...
  constructor(private router:Router) {
    console.log("Creando Componente1")
  }

  ngOnInit(): void {
  }

  public navegacionProgramatica():void{

    //Esto es análogo a cuando en la vista utilizamos '[routerLink]'
    this.router.navigate([ '/componente2', '333', this.valor])

    //Esto es aálogo a cuando en la vista utilizamos 'routerLink'
    //this.router.navigateByUrl('/componente2/444/hola radiola')

  }

}















