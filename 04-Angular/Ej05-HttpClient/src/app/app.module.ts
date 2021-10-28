import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CabeceraComponent } from './componentes/cabecera/cabecera.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { PieComponent } from './componentes/pie/pie.component';
import { ListadoUsuariosComponent } from './componentes/listado-usuarios/listado-usuarios.component';
import { HttpClientModule } from '@Angular/common/http';
import { FormularioCorreoComponent } from './componentes/formulario-correo/formulario-correo.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PieComponent,
    MenuComponent,
    CabeceraComponent,
    ListadoUsuariosComponent,
    FormularioCorreoComponent
  ],
  imports: [
    BrowserModule,   //Este tiene que estar siempre si esto es para el navegador
    FormsModule,     //Para el bidirectional binding
    HttpClientModule //Para poder utilizar el objeto HttpClient (AJAX)    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
