import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'


})

@Injectable()

export class SearchPipe implements PipeTransform{
  transform(items: any, term: any):any {
    if( term == undefined || term == "all"){
      return items;
    }
    //Muy importante la función filter de JavaScript para realizar la búsqueda
    return items.filter(function(item){
      return item.GRUPO_MUSCULAR.toLowerCase().includes(term.toLowerCase());
    })
  }
}
