

export class Disco {

    public constructor(
        public _id   :number|null = null,
        public titulo:string|null = null,
        public grupo :string|null = null,
        public year  :number|null = null,
        public genero:string|null = null,
        public notas :string|null = null
    ){
    }

    public vacio():boolean {
        return (this.titulo==null || this.titulo.trim().length==0) &&
               (this.grupo==null  || this.grupo.trim().length==0)  &&
               (this.year==null   || this.year==0)                 &&
               (this.genero==null || this.genero.trim().length==0) &&
               (this.notas==null  || this.notas.trim().length==0)   
    } 

}

