import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class RoutineService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addRoutine(token, routine){
    let params = JSON.stringify(routine);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'rutinas', params,{headers:headers}).map(res => res.json());
  }

  addExercisesToRutine(token, routine){
    let params = JSON.stringify(routine);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'rutinas/'+routine.ID_RUTINA+'/add', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los administradores
  getRoutines(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'rutinas',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getRoutine(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'rutinas/'+id,{headers:headers}).map(res => res.json());

  }

  getExercisesRoutine(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'rutinas/'+id+'/ejercicios',{headers:headers}).map(res => res.json());

  }

  updateRoutine(token,routine){
    let params = JSON.stringify(routine);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'rutinas/'+routine.ID_RUTINA, params,{headers:headers}).map(res => res.json());
  }

  deleteRoutine(token,id_rutina){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'rutinas/'+id_rutina,params,{headers:headers}).map(res => res.json());
  }

}
