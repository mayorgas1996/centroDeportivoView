import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class AdminService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addAdmin(token, admin){
    let params = JSON.stringify(admin);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'admins', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los administradores
  getAdmins(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'admins',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getAdmin(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'admins/'+id,{headers:headers}).map(res => res.json());

  }

  updateAdmin(token,admin){
    let params = JSON.stringify(admin);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'admins/'+admin.ID_ADMIN, params,{headers:headers}).map(res => res.json());
  }

  deleteAdmin(b_token,id_admin){
    let params = "";
    this.token = b_token;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + this.token);

    return this._http.post(this.url+'admins/delete/'+id_admin,params,{headers:headers}).map(res => res.json());
  }

}
