import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'activities-list',
  templateUrl: './list.component.html'
})
export class ListComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Listar';
  }

}
