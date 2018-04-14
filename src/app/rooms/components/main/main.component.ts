import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rooms-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Salas';
  }

}
