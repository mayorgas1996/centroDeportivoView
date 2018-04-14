import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()

export class LoginService{
  public url: string;
  public token: string;

  constructor(private _http: Http){
    this.url = GLOBAL.url;
  }

  //Metodo para el login
  login(actor_to_login){
    var datos_a_enviar = {
        EMAIL: actor_to_login.email,
        PASSWORD: actor_to_login.password
    };

    let params = JSON.stringify(datos_a_enviar);
    let headers = new Headers({'Content-Type': 'application/json'});

    var tipo_actor;

    if(actor_to_login.rol == 'Administrador'){
      console.log("Quiere identificarse como admin");
      tipo_actor = 'administrador';
    }
    else if(actor_to_login.rol == 'Director'){
      console.log("Quiere identificarse como director");
      tipo_actor = 'director';
    }
    else if (actor_to_login.rol == 'Técnico'){
      console.log("Quiere identificarse como tecnico");
      tipo_actor = 'tecnico';
    }
    else{
      console.log("Quiere identificarse como usuario");
      tipo_actor = 'usuario';
    }

    return this._http.post(this.url+'login/'+tipo_actor, params,{headers:headers}).map(res => res.json());
  }

  //Metodo que nos devuelve el token del usuario actual
  getToken(){
    let token = localStorage.getItem('token');

    if(token != "undefined"){
      this.token = token;
    }
    else{
      this.token = null;
    }

    return this.token;
  }

  //Metodo que nos devuelve el token del usuario actual
  getRol(){
    return localStorage.getItem('rol');
  }

}
