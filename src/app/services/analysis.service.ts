import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class AnalysisService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addAnalysis(token, analysis, id_usuario){
    let params = JSON.stringify(analysis);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'usuarios/usuario/'+id_usuario+'/analisis', params,{headers:headers}).map(res => res.json());
  }

  //Obtener un análisis
  getUserAnalysis(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'usuarios/usuario/'+id + '/analisis',{headers:headers}).map(res => res.json());

  }

}
