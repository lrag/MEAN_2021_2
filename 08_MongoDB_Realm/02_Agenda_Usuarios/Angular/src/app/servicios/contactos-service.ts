import { Injectable } from "@angular/core";
import { RealmService } from "./realm-service";
import { AutenticacionService } from 'src/app/servicios/autenticacion-service';
import { Usuario } from "../entidades/usuario";
import { Contacto } from "../entidades/contacto";

@Injectable({ providedIn : 'root' })
export class ContactosService {

    private coleccionContactos:any
    private usuario:Usuario

    public constructor(private realmService:RealmService,
                       private autenticacionService:AutenticacionService){
        this.coleccionContactos = realmService.getEsquema().collection("contactos")
        this.usuario = this.autenticacionService.getUsuario()
    }

    public async listar():Promise<any> {
        let contactos = await this.coleccionContactos.find({ idUsuario : this.usuario._id })
        console.log(contactos)
        return contactos        
    }
    
    public insertar(contacto:Contacto):Promise<any>{
        let usuario:Usuario = this.autenticacionService.getUsuario()
        delete contacto._id 
        contacto.idUsuario = this.usuario._id
        return this.coleccionContactos.insertOne(contacto)
    }

    public async buscarPorId(_id:string):Promise<any>{

        try {
            let contactoEncontrado = await this.coleccionContactos.findOne({ _id : _id })
            if(!contactoEncontrado){
                throw new Error("El contacto no existe")
            }
            return contactoEncontrado
        } catch (error) {
            throw new Error("Hubo un problema en el servidor")            
        }

        /*
        return new Promise( (resolve, reject) => {
            this.coleccionContactos.findOne({ _id : _id })
            .then( (contactoEncontrado:any) => {
                if(!contactoEncontrado){
                    reject("El contacto no existe")
                    return
                }
                resolve(contactoEncontrado)
            })
            .catch( (error:any) => {
                console.log(error)
                reject("Hubo un problema en el servidor")
            })
        })
        */
    }

}