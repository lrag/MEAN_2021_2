import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';
import { DiscosComponent } from './componentes/discos/discos.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    DiscosComponent,
    CabeceraComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //Módulo para el bidirectional binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
