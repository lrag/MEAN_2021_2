import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppModule.rutas)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 

  static rutas:Routes = [

  ]

}
