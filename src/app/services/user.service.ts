import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class UserService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addUser(token, user){
    let params = JSON.stringify(user);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'usuarios', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los usuarios ACTIVOS
  getActiveUsers(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'usuarios_activos',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getUser(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'usuarios/usuario/'+id,{headers:headers}).map(res => res.json());

  }

  updateUser(token,user){
    let params = JSON.stringify(user);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'usuarios/'+user.ID_USUARIO, params,{headers:headers}).map(res => res.json());
  }

  deleteUser(token,id_user){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'usuarios/'+id_user,params,{headers:headers}).map(res => res.json());
  }


  assignPlan(token,user){
    let params = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'usuarios/plan/asignar',params,{headers:headers}).map(res => res.json());
  }

  updateUserPlan(token,user){
    let params = JSON.stringify(user);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'usuarios/'+user.ID_USUARIO+'/plan',params,{headers:headers}).map(res => res.json());
  }


  renewUser(token,id_user,fecha_fin){
    let params = {
      FECHA_FIN: fecha_fin
    };
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'usuarios/'+id_user+'/renovar',params,{headers:headers}).map(res => res.json());
  }

}
