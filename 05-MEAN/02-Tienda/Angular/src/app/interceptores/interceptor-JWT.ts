import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@Angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AutenticacionService } from "../servicios/autenticacion-service";

//Los interceptores deben de estar marcados con @Injectable y se registran EN EL MÓDULO
//providers : [{
//    provide : HTTP_INTERCEPTORS,
//    useClass : InterceptorJWT,
//    multi : true
//}]
//Y
//Deben implementar la interfaz HttpInterceptor
@Injectable()
export class InterceptorJWT implements HttpInterceptor {

    public constructor(private autenticacionService:AutenticacionService){
    }

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        let JWT = this.autenticacionService.getJWT()
        console.log("ENVIANDO UNA PETICIÓN! Token:"+JWT)

        //En Angular los objetos del tipo HttpRequest son inmutables
        if(JWT){
            //Reutilizamos la variable :)
            req = req.clone({
                setHeaders : {
                    Authorization : 'Bearer '+JWT
                }
            }) 
        }   

        //Si no invocamos 'next' la petición no se enviará
        return next.handle(req)
    }

}