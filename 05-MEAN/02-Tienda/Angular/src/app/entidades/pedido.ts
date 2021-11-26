import { DetallePedido } from "./detallePedido";
import { Usuario } from "./usuario";

export class Pedido {

    public constructor(
        public _id      : string|null  = null,
        public codigo   : string|null  = null,
        public fecha    : string|null  = null,
        public estado   : string|null  = null,
        public direccion: string|null  = null,
        public usuario  : Usuario|null = null,
        public detalles : DetallePedido[] = [],
        public total    : number|null  = null
    ){}

}