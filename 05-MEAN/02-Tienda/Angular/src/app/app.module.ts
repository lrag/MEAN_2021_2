import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/maquetacion/cabecera/cabecera.component';
import { MenuComponent } from './componentes/tienda/menu/menu.component';
import { PieComponent } from './componentes/maquetacion/pie/pie.component';
import { MaquetacionTiendaComponent } from './componentes/maquetacion/maquetacion-tienda/maquetacion-tienda.component';
import { MaquetacionLoginComponent } from './componentes/maquetacion/maquetacion-login/maquetacion-login.component';
import { LoginComponent } from './componentes/usuarios/login/login.component';
import { RegistroComponent } from './componentes/usuarios/registro/registro.component';
import { AceptacionTerminosComponent } from './componentes/usuarios/aceptacion-terminos/aceptacion-terminos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@Angular/common/http';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';
import { CatalogoComponent } from './componentes/tienda/catalogo/catalogo.component';
import { ProductoComponent } from './componentes/tienda/producto/producto.component';
import { ResumenCestaComponent } from './componentes/tienda/resumen-cesta/resumen-cesta.component';
import { CestaComponent } from './componentes/tienda/cesta/cesta.component';
import { DetalleCestaComponent } from './componentes/tienda/detalle-cesta/detalle-cesta.component';
import { BarraIzquierdaComponent } from './componentes/tienda/barra-izquierda/barra-izquierda.component';
import { ConfirmacionCompraComponent } from './componentes/tienda/confirmacion-compra/confirmacion-compra.component';
import { ListadoPedidosComponent } from './componentes/tienda/listado-pedidos/listado-pedidos.component';
import { ListadoFacturasComponent } from './componentes/tienda/listado-facturas/listado-facturas.component';
import { InterceptorJWT } from './interceptores/interceptor-JWT';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    CestaComponent,
    LoginComponent,
    PerfilComponent,
    ProductoComponent,
    CatalogoComponent,
    CabeceraComponent,
    RegistroComponent,
    DetalleCestaComponent,
    ResumenCestaComponent,
    ListadoPedidosComponent,
    BarraIzquierdaComponent,
    ListadoFacturasComponent,
    MaquetacionLoginComponent,
    MaquetacionTiendaComponent,
    AceptacionTerminosComponent,
    ConfirmacionCompraComponent,
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppModule.rutas)
  ],
  providers: [
    //Para registrar un interceptor HTTP:
    {
      provide : HTTP_INTERCEPTORS,
      useClass : InterceptorJWT,
      multi : true
    }
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { 

  //Aqui están las rutas para el router-outlet que está en lo alto de la jerarquía
  static rutas:Routes = [
    {
      path      : "",
      component : MaquetacionLoginComponent,
      children : [
        {
          path      : "",
          component : LoginComponent
        },
        {
          path      : "registro",
          component : RegistroComponent
        },
        {
          path      : "aceptacion",
          component : AceptacionTerminosComponent
        }
      ]      
    },
    {
      path      : "tienda",
      component : MaquetacionTiendaComponent,
      //Rutas para el router-outlet primario
      children  : [
        {
          path      : "perfil",
          component : PerfilComponent
        },        
        {
          path      : "catalogo",
          component : CatalogoComponent
        },      
        {
          path      : "cesta",
          component : CestaComponent
        },
        {
          path      : "compra",
          component : ConfirmacionCompraComponent
        },
        {
          path      : "listadoPedidos",
          component : ListadoPedidosComponent
        },
        {
          path      : "listadoFacturas",
          component : ListadoFacturasComponent
        },
        //  
        //Rutas para los named router outlets
        //
        {
          outlet    : 'izq',
          path      : 'barraIzq',
          component : BarraIzquierdaComponent
          //pueden tener 'children' 
        },
        {
          outlet    : 'der',
          path      : 'resumenCesta',
          component : ResumenCestaComponent
          //pueden tener 'children' 
        },                
      ]      
    }
  ]

}
