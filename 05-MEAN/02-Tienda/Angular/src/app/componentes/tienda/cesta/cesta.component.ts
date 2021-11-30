import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/entidades/pedido';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html'
})
export class CestaComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) {
    this.cesta = cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public vaciarCesta():void{
    
    this.cestaService.crearCesta()
    this.cesta = this.cestaService.getCesta()
    
    //this.cesta.vaciar()

  }

}
