import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ObjectUnsubscribedError } from 'rxjs';
import { DetallePedido } from 'src/app/entidades/detallePedido';
import { Pedido } from 'src/app/entidades/pedido';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-resumen-cesta',
  templateUrl: './resumen-cesta.component.html'
})
export class ResumenCestaComponent implements OnInit {

  public cesta:Pedido

  constructor(private cestaService:CestaService) {
    this.cesta = this.cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  public disminuirCantidad(detallePedido:DetallePedido):void{
    if(!detallePedido.producto){
      return
    }
    this.cesta.quitarProducto(detallePedido.producto)
  }

  public aumentarCantidad(detallePedido:DetallePedido):void{
    if(!detallePedido.producto){
      return
    }
    this.cesta.addProducto(detallePedido.producto)
  }

  public borrarDetalle(detallePedido:DetallePedido):void{
    if(!detallePedido.producto){
      return
    }
    this.cesta.borrarDetalle(detallePedido.producto)    
  }

}
