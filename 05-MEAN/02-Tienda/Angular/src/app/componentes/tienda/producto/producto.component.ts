import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/entidades/producto';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html'
})
export class ProductoComponent implements OnInit {

  public producto:Producto = new Producto()

  constructor() { }

  ngOnInit(): void {
  }

}
