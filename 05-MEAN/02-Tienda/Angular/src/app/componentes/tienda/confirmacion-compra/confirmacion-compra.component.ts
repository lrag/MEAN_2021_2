import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/entidades/pedido';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';
import { CestaService } from 'src/app/servicios/cesta-service';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string = ""
  public mensajeError:string = ""

  constructor(private cestaService:CestaService,
              private autenticacionService:AutenticacionService) {
    this.cesta = cestaService.getCesta()

    let usuario:Usuario = autenticacionService.getUsuario()

    if(usuario.direccion == null || usuario.telefono == null){
      this.mensajeError = "Por favor complete su perfil"
    }
    if(this.cesta.direccion == null){
      this.cesta.direccion = usuario.direccion
    }

  }

  ngOnInit(): void {
  }

}
