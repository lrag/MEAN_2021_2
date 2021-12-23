
export class Producto {

    public constructor(
            public _id        :string|null = null,
            public nombre     :string|null = null,
            public categoria  :string|null = null, //categoria { _id, nombre, descripcion }
            public fabricante :string|null = null,
            public descripcion:string|null = null,
            public imagen     :string|any  = null,
            public precio     :number      = 0,
            public existencias:number|null = null,
        ){}

}