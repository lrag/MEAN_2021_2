export class Usuario {

    public constructor(
        public _id      :string|null = null,
        public nombre   :string|null = null,
        public login    :string|null = null,
        public password :string|null = null,
        public idioma   :string|null = null,
        public direccion:string|null = null,
        public correoE  :string|null = null,
        public telefono :string|null = null
    ){}

}
