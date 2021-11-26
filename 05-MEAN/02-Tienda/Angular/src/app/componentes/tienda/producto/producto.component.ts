import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/entidades/detallePedido';
import { Pedido } from 'src/app/entidades/pedido';
import { Producto } from 'src/app/entidades/producto';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  @Input()
  public producto:Producto = new Producto()
  constructor(private cestaService:CestaService) { }

  ngOnInit(): void {
  }

  public comprar():void{
    let cesta:Pedido = this.cestaService.getCesta()
    cesta.addProducto(this.producto)
  }

}
