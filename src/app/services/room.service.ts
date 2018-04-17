import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class RoomService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addRoom(token, sala){
    let params = JSON.stringify(sala);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'salas', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todas las salas
  getRooms(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'salas',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getRoom(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'salas/'+id,{headers:headers}).map(res => res.json());

  }

  updateRoom(token,sala){
    let params = JSON.stringify(sala);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'salas/'+sala.ID_SALA, params,{headers:headers}).map(res => res.json());
  }

  deleteRoom(token,id_sala){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'salas/'+id_sala,params,{headers:headers}).map(res => res.json());
  }

}
