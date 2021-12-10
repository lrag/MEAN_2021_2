import { Component, OnInit } from '@angular/core';
import { Factura } from 'src/app/entidades/factura';
import { FacturasService } from 'src/app/servicios/facturas-service';

@Component({
  selector: 'app-listado-facturas',
  templateUrl: './listado-facturas.component.html'
})
export class ListadoFacturasComponent implements OnInit {

  public facturas:Factura[] = []

  constructor(private facturasService:FacturasService) {

    facturasService
      .listarFacturas()
      .subscribe(
        facturas => this.facturas = facturas,
        err => console.log(err)
      )
  
  }

  ngOnInit(): void {
  }

}
