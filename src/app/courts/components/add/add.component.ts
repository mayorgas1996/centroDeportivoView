import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courts-add',
  templateUrl: './add.component.html'
})
export class AddComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Crear';
  }

}
