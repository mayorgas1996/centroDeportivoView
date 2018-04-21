import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'


})

@Injectable()

export class SearchPipe implements PipeTransform{
  transform(items: any, term: any):any {

    if( term == undefined || term === ''){
      return items;
    }
    //Muy importante la función filter de JavaScript para realizar la búsqueda
    return items.filter(function(item){
      term = term.toString().split("-").reverse().join("/");
      return item.FECHA.toString() === term;
    })
  }
}
