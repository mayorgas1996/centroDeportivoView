import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Buscar';
  }

}
