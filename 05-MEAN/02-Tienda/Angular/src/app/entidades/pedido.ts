import { BehaviorSubject, Subject } from "rxjs";
import { CestaService } from "../servicios/cesta-service";
import { DetallePedido } from "./detallePedido";
import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Pedido {

    public subject:Subject<Pedido>|null = null

    public constructor(
      public _id      : string|null  = null,
      public codigo   : string|null  = null,
      public fecha    : string|null  = null,
      public estado   : string|null  = null,
      public direccion: string|null  = null,
      public usuario  : Usuario|null = null,
      public detalles : DetallePedido[] = [],
      public total    : number|null  = null,
      public formaPago: string|null  = null
    ){}

    public getSubject(){
      if(!this.subject){
        this.subject = new Subject()
      }
      return this.subject
    }

    public addProducto(producto:Producto):void{
      let detalle:any = null
      for(let detalleAux of this.detalles){
        if(detalleAux?.producto?._id == producto._id){
          detalle = detalleAux
          break
        }
      }
      if(detalle){
        detalle.cantidad++
      } else {
        detalle = new DetallePedido(producto, 1, producto.precio)
        this.detalles?.push(detalle)
      }
  
      this.calcularTotal()   
      this.subject?.next(this) 
    } 
    
    public quitarProducto(producto:Producto):void{
        
      for(let a=0; a<this.detalles.length; a++){
        let detalle:DetallePedido = this.detalles[a]
        if(detalle.producto?._id == producto._id){
          detalle.cantidad--
          if(detalle.cantidad == 0){
            this.detalles.splice(a,1)
          }
        }
      }

      this.calcularTotal()
      this.subject?.next(this)
    } 

    public borrarDetalle(producto:Producto):void{
      for(let a=0; a<this.detalles.length; a++){
        let detalleAux = this.detalles[a]
        if(detalleAux.producto?._id == producto._id){
          this.detalles.splice(a,1)
          break
        }
      }

      this.calcularTotal()
      this.subject?.next(this)
    }
        
    /*
    public vaciar():void{
      console.log("Me vacío")
      this._id       = null,
      this.codigo    = null,
      this.fecha     = null,
      this.estado    = null,
      this.direccion = null,
      this.usuario   = null,
      this.detalles  = [],
      this.total     = null
      this.subject?.next(this) 
    }
    */

    private calcularTotal():void{
        let detalle:any
        let total:number = 0
        for(detalle of this.detalles){
          total += detalle.cantidad*detalle.precio
        }
        this.total = total
    }

}