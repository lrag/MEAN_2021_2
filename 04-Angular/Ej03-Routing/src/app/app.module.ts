import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { Componente1Component } from './componentes/componente1/componente1.component';
import { Componente2Component } from './componentes/componente2/componente2.component';

import { MenuComponent } from './componentes/menu/menu.component';

let rutas:Routes = [
  {
    //Cuando en la barra del navegador ponga '/componente1' en un router-outlet habrá que colocar 'Componente1Component'
    path : 'componente1', //cuando definimos el 'path' no puede empezar por '/'
    component : Componente1Component
  },
  {
    //Cuando en la barra del navegador ponga '/componente2' en un router-outlet habrá que colocar 'Componente2Component'
    path : 'componente2',
    component : Componente2Component
  },
  {
    //Cuando en la barra del navegador ponga '/componente2' en un router-outlet habrá que colocar 'Componente2Component'
    path : 'componente2/:dato1/:dato2',
    component : Componente2Component
  },
]

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CabeceraComponent,
    Componente1Component,
    Componente2Component
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rutas) //Para la navegación

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
