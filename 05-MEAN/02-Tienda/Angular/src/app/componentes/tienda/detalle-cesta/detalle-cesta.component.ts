import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/entidades/detallePedido';
import { Pedido } from 'src/app/entidades/pedido';
import { Producto } from 'src/app/entidades/producto';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-detalle-cesta',
  templateUrl: './detalle-cesta.component.html'
})
export class DetalleCestaComponent implements OnInit {

  @Input()
  public detalle:DetallePedido = new DetallePedido()
  @Input()
  public cesta:Pedido = new Pedido()

  constructor() { 
  }

  ngOnInit(): void {
  }

  public disminuirCantidad():void{
    let producto:any = this.detalle.producto
    this.cesta.quitarProducto(producto)
  }
  
  public aumentarCantidad():void{
    let producto:any = this.detalle.producto
    this.cesta.addProducto(producto)
  }

  public borrarDetalle():void{
    
  }

}
