import { Injectable } from "@angular/core";
import { RealmService } from "./realm-service";
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';
import { Usuario } from "../entidades/usuario";

@Injectable({ providedIn : 'root' })
export class ContactosService {

    private coleccionContactos:any

    public constructor(private realmService:RealmService,
                       private autenticacionService:AutenticacionService){
        this.coleccionContactos = realmService.getEsquema().collection("contactos")
    }

    public async listar():Promise<any> {

        let usuario:Usuario = this.autenticacionService.getUsuario()
        let contactos = await this.coleccionContactos.find({ idUsuario : usuario._id })
        console.log(contactos)
        return contactos

    }

}