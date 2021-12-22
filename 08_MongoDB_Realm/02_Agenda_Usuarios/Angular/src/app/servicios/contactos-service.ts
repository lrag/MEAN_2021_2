import { Injectable } from "@angular/core";
import { RealmService } from "./realm-service";

@Injectable({ providedIn : 'root' })
export class ContactosService {

    public constructor(private realmService:RealmService){
    }

    public listar():void {

        this.realmService.getEsquema()



    }

}