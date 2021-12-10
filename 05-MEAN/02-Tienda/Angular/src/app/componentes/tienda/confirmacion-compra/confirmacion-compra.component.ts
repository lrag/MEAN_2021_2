import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/entidades/pedido';
import { Usuario } from 'src/app/entidades/usuario';
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';
import { CestaService } from 'src/app/servicios/cesta-service';
import { PedidosService } from 'src/app/servicios/pedidos-service';

@Component({
  selector: 'app-confirmacion-compra',
  templateUrl: './confirmacion-compra.component.html'
})
export class ConfirmacionCompraComponent implements OnInit {

  public cesta:Pedido
  public mensaje:string = ""
  public mensajeError:string = ""

  constructor(private cestaService:CestaService,
              private pedidosService:PedidosService,
              private autenticacionService:AutenticacionService,
              private router:Router) {
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

  public comprar():void{

    //Validar...

    this.pedidosService.comprar(this.cesta)
    .subscribe(
      x => { 
        this.mensaje = "La compra se ha efectuado"
        this.cestaService.crearCesta()
        //Ocultamos el resumen cesta
        this.router.navigate([
          "/tienda", 
          {
            outlets : {
              'der'     : null
            }
          }
        ], { skipLocationChange : true })        
      },
      err => {
        console.log(err)
        if(err.error.codigo == 400){
          this.mensajeError = "Los datos del pedido son invalidos"
        } else {
          this.mensajeError = err.error.mensaje
        }
      }
    )
    
  }


}
