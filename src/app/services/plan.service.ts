import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class PlanService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  addPlan(token, plan){
    let params = JSON.stringify(plan);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'planes', params,{headers:headers}).map(res => res.json());
  }

  //Obtener todos los administradores
  getPlans(token){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'planes',{headers:headers}).map(res => res.json());

  }

  //Obtener un administrador
  getPlan(token,id){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.get(this.url+'planes/plan/'+id,{headers:headers}).map(res => res.json());

  }

  updatePlan(token,plan){
    let params = JSON.stringify(plan);

    console.log("Actualizando: " + params);

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.put(this.url+'planes/'+plan.ID_PLAN, params,{headers:headers}).map(res => res.json());
  }

  deletePlan(token,id_plan){
    let params = "";
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + token);

    return this._http.post(this.url+'planes/'+id_plan,params,{headers:headers}).map(res => res.json());
  }

}
