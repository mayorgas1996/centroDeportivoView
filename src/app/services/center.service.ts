import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class CenterService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addCenter(token, center){
    let params = JSON.stringify(center);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'centros', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los administradores
  getCenters(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'centros',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getCenter(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'centros/'+id,{headers:headers}).map(res => res.json());

  }

  updateCenter(token,center){
    let params = JSON.stringify(center);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'centros/'+center.ID_CENTRO, params,{headers:headers}).map(res => res.json());
  }

  deleteCenter(token,id_centro){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'centros/'+id_centro,params,{headers:headers}).map(res => res.json());
  }

}
