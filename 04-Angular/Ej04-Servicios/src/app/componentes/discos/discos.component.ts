import { Component, OnInit } from '@angular/core';
import { Disco } from 'src/app/entidades/disco';
import { ServicioDiscos } from 'src/app/servicios/servicioDiscos';

@Component({
  selector: 'app-discos',
  templateUrl: './discos.component.html',
  providers: [ ServicioDiscos ], //DiscosComponent exige su propio ServicioDiscos
})
export class DiscosComponent implements OnInit {

  public disco:Disco = new Disco()
  public discos:Disco[] 

  constructor(private servicioDiscos:ServicioDiscos) { 
    this.discos = servicioDiscos.listar()
  }

  ngOnInit(): void {
  }
  
  public insertar():void{
    console.log("Insertando...")

    this.servicioDiscos.insertar(this.disco)
    this.vaciar()
  }

  public modificar():void{
    console.log("Modificando...")
    this.vaciar()
  }

  public borrar():void{
    console.log("Borrando...")
    this.vaciar()
  }

  public vaciar():void{
    console.log("Vaciando...")     
    this.disco = new Disco()
  }
  
  public seleccionar(disco:Disco):void{
    console.log("Seleccionando...", disco)

    if(disco._id == null){
      return
    }
      
    let putaMierda:Disco|null = this.servicioDiscos.buscarPorId(disco._id)
    if(putaMierda != null){
      this.disco = putaMierda
    }

  }

}
