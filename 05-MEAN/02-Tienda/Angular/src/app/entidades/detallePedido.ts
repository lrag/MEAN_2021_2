import { Producto } from "./producto";

export class DetallePedido {

    public constructor(
        public producto:Producto|null = null,
        public cantidad:number|null = null,
        public precio:number|null = null,
    ){}

}