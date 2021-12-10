import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/entidades/pedido';
import { PedidosService } from 'src/app/servicios/pedidos-service';

@Component({
  selector: 'app-listado-pedidos',
  templateUrl: './listado-pedidos.component.html'
})
export class ListadoPedidosComponent implements OnInit {

  public pedidos:Pedido[] = []

  constructor(private pedidosService:PedidosService) {

    pedidosService
      .listarPedidos()
      .subscribe(
        pedidos => this.pedidos = pedidos,
        err => console.log(err)
      )
  
  }

  ngOnInit(): void {
  }

}
