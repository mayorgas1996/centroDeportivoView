import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'staff-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Listar';
  }

}
