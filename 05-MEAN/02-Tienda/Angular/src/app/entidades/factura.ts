import { BehaviorSubject, Subject } from "rxjs";
import { CestaService } from "../servicios/cesta-service";
import { DetallePedido } from "./detallePedido";
import { Producto } from "./producto";
import { Usuario } from "./usuario";

export class Factura {

  public constructor(
      public _id      : string|null  = null,
      public codigo   : string|null  = null,
      public fecha    : string|null  = null,
      public estado   : string|null  = null,
      public direccion: string|null  = null,
      public usuario  : Usuario|null = null,
      public detalles : DetallePedido[] = [], //Tendría que se 'DetalleFactura[]'
      public total    : number|null  = null,
      public formaPago: string|null  = null,
      public pedido   : string|null  = null
    ){}

}