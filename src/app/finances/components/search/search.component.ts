import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'finances-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  public title:string;

  constructor(

  ){
    this.title = 'Buscar';
  }

}
