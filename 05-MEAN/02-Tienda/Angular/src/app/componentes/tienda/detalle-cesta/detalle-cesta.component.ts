import { Component, Input, OnInit } from '@angular/core';
import { DetallePedido } from 'src/app/entidades/detallePedido';
import { Pedido } from 'src/app/entidades/pedido';
import { Producto } from 'src/app/entidades/producto';
import { CestaService } from 'src/app/servicios/cesta-service';

//CICLO DE VIDA DE LOS COMPONENTES ANGULAR
//angular descubre que debe mostrarse un componente
//1-crea la instancia de la clase adecuada
//  new CatalogoComponent()
//    se inicializan las propiedades, pero si tienen @Input todavía no se obtiene el valor
//    se ejecuta el constructor
//2-Se inyectan los valores asociados a propiedades con el decorados @Input()
//3-Localiza la plantilla y la ejecuta
//4-Cuando se ha generado el contenido se muestra en el lugar adecuado
//5-Si el componente implementa OnInit
//  se invoca ngOnInit
//6-Si el componente implementa OnDestroy
//  se invoca ngOnDestroy si el componente va a desaparecer

@Component({
  selector: 'app-detalle-cesta',
  templateUrl: './detalle-cesta.component.html'
})
export class DetalleCestaComponent implements OnInit {

  @Input()
  public detalle:DetallePedido = new DetallePedido()
  @Input()
  public cesta:Pedido = new Pedido()

  private producto:any

  constructor(private cestaService:CestaService) { 
    //Aqui es demasiado pronto para extraer el producto del detalle que nos inyectarán con @Input
    //dirante la ejecución del constructor aún no hemos recibido esos valores
    //this.producto = this.detalle.producto
  }
  
  //bgOnInit se invoca después de que se haya:
  //-ejecutado el constructor
  //-recibido los valores con @Input
  //-generado el contenido de la plantilla
  ngOnInit(): void {
    this.producto = this.detalle.producto
  }

  public disminuirCantidad():void{
    this.cesta.quitarProducto(this.producto)
    this.cestaService.guardarCesta(this.cesta)
  }
  
  public aumentarCantidad():void{
    this.cesta.addProducto(this.producto)
  }

  public borrarDetalle():void{
    this.cesta.borrarDetalle(this.producto)    
  }

}
