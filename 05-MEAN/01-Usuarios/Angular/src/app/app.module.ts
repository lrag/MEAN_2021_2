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
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@Angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    LoginComponent,
    CabeceraComponent,
    RegistroComponent,
    MaquetacionLoginComponent,
    MaquetacionTiendaComponent,
    AceptacionTerminosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    HttpClientModule,
    RouterModule.forRoot(AppModule.rutas)
  ],
  providers: [],
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
      component : MaquetacionTiendaComponent
    }
  ]

}
