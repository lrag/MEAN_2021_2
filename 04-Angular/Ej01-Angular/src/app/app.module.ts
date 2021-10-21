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
  //En esta sección indicamos que 'librerías (módulos)' Angular vamos a utilizar
  imports: [
    BrowserModule, //Este módulo está siempre cuando la app angular se va a ver en un navegador
    FormsModule    //Este módulo es para el bidirectional binding
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

