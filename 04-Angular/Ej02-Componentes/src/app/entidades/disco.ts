

export class Disco {

    public constructor(
        public _id   :number|null = null,
        public titulo:string|null = null,
        public grupo :string|null = null,
        public year  :number|null = null,
        public genero:string|null = null,
        public notas :string|null = null
    ){
        if(_id == null){
            this._id = Date.now()
        }
    }

}

