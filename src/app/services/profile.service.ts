import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { LoginService } from './login.service';

@Injectable()

export class ProfileService {

  public url: string;
  public token: string;
  public rol: string;

  constructor(
    private _http: Http,
    private _loginService: LoginService
  ){
    this.rol = _loginService.getRol();
    this.url = GLOBAL.url;
  }

  getMyProfile(){

    var datos_a_enviar;
    let tipo_actor;
    var id = localStorage.getItem('id');

    //Enviamos peticion GET a la API en función del actor que seamos
    if(this.rol == 'Administrador'){
      console.log("Quiere obtener los datos como admin");
      tipo_actor = 'admins';
    }
    else if(this.rol == 'Director'){
      console.log("Quiere obtener los datos como director");
      tipo_actor = 'directores';

    }
    else if (this.rol == 'Técnico'){
      console.log("Quiere obtener los datos como tecnico");
      tipo_actor = 'tecnicos';
    }
    else{
      console.log("Quiere obtener los datos como usuario");
      tipo_actor = 'usuarios';
    }

    //Preparamos lo que vamos a enviar
    let params;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + this._loginService.getToken());

    return this._http.post(this.url+tipo_actor+'/mi_perfil', params,{headers:headers}).map(res => res.json());

  }

  updateProfile(profile_to_update){

    var datos_a_enviar = {
        email: profile_to_update.email,
        password: profile_to_update.password,
        nombre: profile_to_update.nombre,
        telefono: profile_to_update.telefono,
        domicilio: profile_to_update.domicilio,
        municipio: profile_to_update.municipio,
        provincia: profile_to_update.provincia
    };

    let params = JSON.stringify(datos_a_enviar);
    console.log('Datos a enviar: ' + params);
    var tipo_actor;

    if(localStorage.getItem('rol') == 'Administrador'){
      tipo_actor = 'admins';
    }
    else if(localStorage.getItem('rol') == 'Director'){
      tipo_actor = 'directores';
    }
    else if (localStorage.getItem('rol') == 'Técnico'){
      tipo_actor = 'tecnicos';
    }
    else{
      tipo_actor = 'usuarios';
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization','Bearer ' + this._loginService.getToken());

    return this._http.put(this.url+tipo_actor+'/mi_perfil/'+localStorage.getItem('id'), params,{headers:headers}).map(res => res.json());


  }


}
