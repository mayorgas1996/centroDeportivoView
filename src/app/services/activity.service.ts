import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class ActivityService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addActivity(token, actividad){
    let params = JSON.stringify(actividad);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'actividades', params,{headers:headers}).map(res => res.json());
  }

  getSchedule(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'horario/actividades',{headers:headers}).map(res => res.json());
  }

  addImpartida(token, schedule){
    let params = JSON.stringify(schedule);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'horario/actividades', params,{headers:headers}).map(res => res.json());
  }

  updateImpartida(token, schedule){
    let params = JSON.stringify(schedule);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'horario/actividades/'+schedule.ID_SALA , params,{headers:headers}).map(res => res.json());
  }

  deleteImpartida(token, schedule){
    let params = JSON.stringify(schedule);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'horario/actividades/'+schedule.ID_SALA , params,{headers:headers}).map(res => res.json());
  }

  //Obtener todas las actividades
  getActivities(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'actividades',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getActivity(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'actividades/'+id,{headers:headers}).map(res => res.json());

  }

  updateActivity(token,actividad){
    let params = JSON.stringify(actividad);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'actividades/'+actividad.ID_ACTIVIDAD, params,{headers:headers}).map(res => res.json());
  }

  deleteActivity(token,id_actividad){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'actividades/'+id_actividad,params,{headers:headers}).map(res => res.json());
  }


  getStaffAvailable(token,actividad){
    let params = JSON.stringify(actividad);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'actividades/disponibilidad/staff',params,{headers:headers}).map(res => res.json());
  }

  getRoomsAvailable(token,actividad){
    let params = JSON.stringify(actividad);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'actividades/disponibilidad/salas',params,{headers:headers}).map(res => res.json());
  }

}
