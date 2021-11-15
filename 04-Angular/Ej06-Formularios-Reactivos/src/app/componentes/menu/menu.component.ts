import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public constructor(){
    console.log("Creando una instancia de MenuComponent")
  }

  ngOnInit(): void {
  }

}
