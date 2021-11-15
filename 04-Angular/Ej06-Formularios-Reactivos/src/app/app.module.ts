import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';
import { ListadoDiscosComponent } from './componentes/listado-discos/listado-discos.component';
import { FormularioDiscosComponent } from './componentes/formulario-discos/formulario-discos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { DiscosService } from './servicios/discos.service';

let rutas:Routes = [
  {
    path      : '',
    component : ListadoDiscosComponent
  },
  {
    path      : 'listadoDiscos',
    component : ListadoDiscosComponent
  },
  {
    path      : 'formularioDiscos',
    component : FormularioDiscosComponent
  },
  {
    path      : 'formularioDiscos/:id',
    component : FormularioDiscosComponent
  }
]

@NgModule({
  declarations: [
    PieComponent,
    AppComponent,
    MenuComponent,
    CabeceraComponent,
    ListadoDiscosComponent,
    FormularioDiscosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,         //Para el [(ngModel)]
    ReactiveFormsModule, //Para los formularios reactivos
    RouterModule.forRoot(rutas)
  ],
  providers: [ /*DiscosService*/ ],
  bootstrap: [AppComponent]
})
export class AppModule { }
