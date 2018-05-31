import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class StatsService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  getActivityAssist(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/actividad/' + id ,{headers:headers}).map(res => res.json());

  }

  getActivityAssistByGender(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/actividades/genero',{headers:headers}).map(res => res.json());
  }

  getFinancialSummary(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/financieras',{headers:headers}).map(res => res.json());
  }

  getUsersSummary(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/usuarios',{headers:headers}).map(res => res.json());
  }

  getUsersAgeSummary(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/usuarios/edades',{headers:headers}).map(res => res.json());
  }

  getRoutinesInformation(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/rutinas',{headers:headers}).map(res => res.json());
  }

  getCourtBooks(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'estadisticas/pista/' + id ,{headers:headers}).map(res => res.json());

  }

}
