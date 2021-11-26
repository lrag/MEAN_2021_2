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
  public producto:Producto|null = null
  constructor(private cestaService:CestaService) { }

  ngOnInit(): void {
  }

  public comprar():void{

    let cesta:Pedido = this.cestaService.getCesta()



    let detalle:any = null
    for(let detalleAux of cesta.detalles){
      if(detalleAux?.producto?._id == this.producto?._id){
        detalle = detalleAux
        break
      }
    }
    if(detalle){
      detalle.cantidad++
    } else {
      detalle = new DetallePedido(this.producto, 1, this.producto?.precio)
      cesta.detalles?.push(detalle)
    }

    




    //let detalle:DetallePedido = new DetallePedido(this.producto, 1, this.producto?.precio)
    //cesta.detalles?.push(detalle)
    console.log(cesta)    

  }

}
