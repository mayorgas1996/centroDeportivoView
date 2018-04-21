import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class CourtService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addCourt(token, pista){
    let params = JSON.stringify(pista);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'pistas', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todas las pistas
  getCourts(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'pistas',{headers:headers}).map(res => res.json());

  }

  //Obtener una pista
  getCourt(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'pistas/'+id,{headers:headers}).map(res => res.json());

  }

  updateCourt(token,pista){
    let params = JSON.stringify(pista);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'pistas/'+pista.ID_PISTA, params,{headers:headers}).map(res => res.json());
  }

  updateCourtStatus(token,pista){
    let params = JSON.stringify(pista);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'pistas/estado/'+pista.ID_PISTA, params,{headers:headers}).map(res => res.json());
  }

  deleteCourt(token,id_pista){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'pistas/'+id_pista,params,{headers:headers}).map(res => res.json());
  }

}
