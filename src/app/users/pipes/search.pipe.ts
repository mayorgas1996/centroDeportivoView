import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'


})

@Injectable()

export class SearchPipe implements PipeTransform{
  transform(items: any, term: any):any {
    if( term == undefined){
      return items;
    }
    //Muy importante la función filter de JavaScript para realizar la búsqueda
    return items.filter(function(item){
      return item.NOMBRE.toLowerCase().includes(term.toLowerCase());
    })
  }
}
