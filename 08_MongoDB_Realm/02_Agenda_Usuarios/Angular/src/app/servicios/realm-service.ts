import { Injectable } from "@angular/core";
import { App } from 'realm-web'
import { ConfiguracionUtil } from "./configuracion-util";


@Injectable( { providedIn : 'root' })
export class RealmService {

    private app:App|any 
    private esquema:any

    public constructor(){
    }

    public getApp(){
        //Aqui hay dos patrones de diseño:
        //-lazy inicialization
        //-singleton
        if(!this.app){
            //Con javascript:
            //let app:App = new Realm.App({ id: "agendausuarios-cvemp" })
            //Con typescript:            
            this.app = new App({ id : ConfiguracionUtil.idApp })    
        }
        return this.app
    }

    public getEsquema():any{
        if(!this.esquema){
            let mongo = this.getApp().currentUser.mongoClient("mongodb-atlas")
            this.esquema = mongo.db("bbdd_agenda_usuarios")
        }
        return this.esquema
    }

}