//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Director  } from '../../../models/director';
import { DirectorService  } from '../../../services/director.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'directors-list',
  templateUrl: './list.component.html',
  providers: [DirectorService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public directors: Director[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _directorService: DirectorService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getDirectors();
  }

  getDirectors(){
    this._directorService.getDirectors(this.token).subscribe(
      data => {
        this.directors  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteDirector(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._directorService.deleteDirector(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getDirectors();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
