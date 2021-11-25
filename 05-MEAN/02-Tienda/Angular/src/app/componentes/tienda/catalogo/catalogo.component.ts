import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/entidades/producto';
import { ProductosService } from 'src/app/servicios/productos-service';

//CICLO DE VIDA DE LOS COMPONENTES ANGULAR
//angular descubre que debe mostrarse un componente
//1-crea la instancia de la clase adecuada
//  new CatalogoComponent()
//    se inicializan las propiedades
//    se ejecuta el constructor
//2-Localiza la plantilla y la ejecuta
//3-Cuando se ha generado el contenido se muestra en el lugar adecuado
//4-Si el componente implementa OnInit
//  se invoca ngOnInit

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html'
})
export 
class CatalogoComponent implements OnInit {

  public productos:Producto[] = []

  constructor(private productosService:ProductosService) { 
    this.buscar()
  }
  
  ngOnInit(): void {   
  }
  
  public buscar():void{
    this.productosService.listarProductos()
    .subscribe(
      resultado => {
        console.log(resultado)
        this.productos=resultado
      },
      err => {
        console.log(err)
        alert("AY MAMÁ!")
      }
    )
  }

}
