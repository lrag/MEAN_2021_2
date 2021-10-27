import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { DiscosComponent } from './componentes/discos/discos.component';
import { FormularioDiscosComponent } from './componentes/formularioDiscos/formulariodiscos.component';
import { ListadoDiscosComponent } from './componentes/listadoDiscos/listadodiscos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';
import { ServicioDiscos } from './servicios/servicioDiscos';

let rutas:Routes = [
  {
    path : "",
    component : ListadoDiscosComponent
  },
  {
    path : "discos/listado",
    component : ListadoDiscosComponent
  },
  {
    path : "discos/formulario",
    component : FormularioDiscosComponent
  }, 
  {
    path : "discos/formulario/:idDisco",
    component : FormularioDiscosComponent
  }, 
]

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    DiscosComponent,
    CabeceraComponent,
    ListadoDiscosComponent,
    FormularioDiscosComponent
  ],
  imports: [
    BrowserModule, //Este está siempre en una aplicación web
    FormsModule,   //Para el bidirectional binding
    RouterModule.forRoot(rutas)   //Para los router-outlets
  ],
  //providers: [ ServicioDiscos ],
  bootstrap: [AppComponent]
})
export class AppModule { }
