import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class StaffService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addStaff(token, staf){
    let params = JSON.stringify(staf);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'tecnicos', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los staf
  getStaffs(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'tecnicos',{headers:headers}).map(res => res.json());

  }

  //Obtener un tecnico
  getStaff(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'tecnicos/'+id,{headers:headers}).map(res => res.json());

  }

  updateStaff(token,staf){
    let params = JSON.stringify(staf);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'tecnicos/'+staf.ID_TECNICO, params,{headers:headers}).map(res => res.json());
  }

  deleteStaff(token,id_staf){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'tecnicos/delete/'+id_staf,params,{headers:headers}).map(res => res.json());
  }

}
