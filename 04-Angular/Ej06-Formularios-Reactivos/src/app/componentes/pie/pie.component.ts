import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  public constructor(){
    console.log("Creando una instancia de PieComponent")
}

  ngOnInit(): void {
  }

}
