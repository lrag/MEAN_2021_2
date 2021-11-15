import { Component } from '@angular/core';
import { DiscosService } from './servicios/discos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //providers: [ DiscosService ]
})
export class AppComponent {

  public constructor(){
    console.log("Creando una instancia de AppComponent")
  }

}
