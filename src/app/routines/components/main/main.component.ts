import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'routines-main',
  templateUrl: './main.component.html'
})
export class MainComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Rutinas';
  }

}
