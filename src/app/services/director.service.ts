import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class DirectorService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addDirector(token, director){
    let params = JSON.stringify(director);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'directores', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los directores
  getDirectors(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'directores',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getDirector(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'directores/'+id,{headers:headers}).map(res => res.json());

  }

  updateDirector(token,director){
    let params = JSON.stringify(director);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'directores/'+director.ID_DIRECTOR, params,{headers:headers}).map(res => res.json());
  }

  deleteDirector(token,id_director){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'directores/delete/'+id_director,params,{headers:headers}).map(res => res.json());
  }

}
