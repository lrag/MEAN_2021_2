import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-maquetacion-tienda',
  templateUrl: './maquetacion-tienda.component.html',
  providers: [ CestaService ] //Registrando aquí a CestaService conseguimos que se cree uno nuevo cuando se autentica un usuario
})
export class MaquetacionTiendaComponent implements OnInit {

  constructor(private router:Router) {

    this.router.navigate([
      "/tienda", 
      {
        outlets : {
          //clave: nombre del router outlet
          //valor: ruta a aplicar
          'primary' : ['catalogo'],
          'izq'     : ['barraIzq'],
          'der'     : ['resumenCesta']
        }
      }
    ], { skipLocationChange : true })

  }

  ngOnInit(): void {
  }

}
