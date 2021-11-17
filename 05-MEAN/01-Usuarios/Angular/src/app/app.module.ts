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
import { HttpClientModule } from '@Angular/common/http';
import { PerfilComponent } from './componentes/usuarios/perfil/perfil.component';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    LoginComponent,
    PerfilComponent,
    CabeceraComponent,
    RegistroComponent,
    MaquetacionLoginComponent,
    MaquetacionTiendaComponent,
    AceptacionTerminosComponent
  ],
  imports: [
    FormsModule, 
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
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
