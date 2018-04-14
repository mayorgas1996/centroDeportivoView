import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'courts-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Listar';
  }

}
