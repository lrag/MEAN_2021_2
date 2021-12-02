import { getAttrsForDirectiveMatching } from '@angular/compiler/src/render3/view/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ObjectUnsubscribedError, Subscription } from 'rxjs';
import { DetallePedido } from 'src/app/entidades/detallePedido';
import { Pedido } from 'src/app/entidades/pedido';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-resumen-cesta',
  templateUrl: './resumen-cesta.component.html'
})
export class ResumenCestaComponent implements OnInit, OnDestroy {

  public cesta:Pedido
  public mostrarBtnComprar:boolean = true
  public subscripcion:Subscription

  constructor(private cestaService:CestaService,
              private router:Router) {
    
    this.subscripcion = this.router.events.subscribe((evento) => {        
      if (evento instanceof NavigationEnd) {
        console.log("NAVEGACION DETECTADA:"+evento.url)
        this.mostrarBtnComprar = true
        if(evento.url.match("compra")){
          this.mostrarBtnComprar = false
        } 
      }
    });    

    this.cesta = this.cestaService.getCesta()
  }

  ngOnInit(): void {
  }

  ngOnDestroy():void{
    this.subscripcion.unsubscribe()
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
