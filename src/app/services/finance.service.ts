import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class FinanceService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addFinance(token, operacion){
    let params = JSON.stringify(operacion);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'contabilidad/'+operacion.TIPO_OPERACION, params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los administradores
  getFinances(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'contabilidad/operaciones',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getFinance(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'contabilidad/operacion/'+id,{headers:headers}).map(res => res.json());

  }

  updateFinance(token,operacion){
    let params = JSON.stringify(operacion);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'contabilidad/operacion/'+operacion.ID_OPERACION, params,{headers:headers}).map(res => res.json());
  }

  deleteFinance(token,id_operacion){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'contabilidad/operacion/'+id_operacion,params,{headers:headers}).map(res => res.json());
  }

}
