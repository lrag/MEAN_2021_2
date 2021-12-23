import { Component, Input, OnInit } from '@angular/core';
import { Pedido } from 'src/app/entidades/pedido';
import { Producto } from 'src/app/entidades/producto';
import { CestaService } from 'src/app/servicios/cesta-service';
import { ProductosService } from 'src/app/servicios/productos-service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  @Input()
  public producto:Producto = new Producto()

  public imagenProducto:any

  constructor(private cestaService:CestaService,
              private productosService:ProductosService) {
  }

  ngOnInit(): void {    

    this.productosService.getImage(this.producto.imagen)
    .subscribe(
      data => this.createImageFromBlob(data),
      error => console.log(error)
    );

  }

  //Esto deberia estar en un servicio
  public createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.imagenProducto = reader.result;
    }, false);
 
    if (image) {
       reader.readAsDataURL(image);
    }
  }


  public comprar():void{
    let cesta:Pedido = this.cestaService.getCesta()
    cesta.addProducto(this.producto)
  }

}
