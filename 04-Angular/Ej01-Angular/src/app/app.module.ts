import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

//Decoradores
//En Angular se utilizan decoradores para guardar configuracion
@NgModule({
  //En esta sección listamos los componentes que conforman este módulo
  declarations: [
    AppComponent
  ],
  //En esta sección indicamos que 'librerías' Angular vamos a utilizar
  imports: [
    BrowserModule,
    FormsModule //Este módulo es para el bidirectional binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

