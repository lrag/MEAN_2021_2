import { Component } from '@angular/core';
import { ServicioDiscos } from './servicios/servicioDiscos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //providers: [ ServicioDiscos ],
})
export class AppComponent {
  title = 'Ej04-Servicios';
}
