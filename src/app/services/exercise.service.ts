import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class ExerciseService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addExercise(token, ejercicio){
    let params = JSON.stringify(ejercicio);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'ejercicios', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todas las ejercicios
  getExercises(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'ejercicios',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getExercise(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'ejercicios/'+id,{headers:headers}).map(res => res.json());

  }

  updateExercise(token,ejercicio){
    let params = JSON.stringify(ejercicio);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'ejercicios/'+ejercicio.ID_EJERCICIO, params,{headers:headers}).map(res => res.json());
  }

  deleteExercise(token,id_ejercicio){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'ejercicios/'+id_ejercicio,params,{headers:headers}).map(res => res.json());
  }

}
