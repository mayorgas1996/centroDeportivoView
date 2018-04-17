//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Court  } from '../../../models/court';
import { CourtService  } from '../../../services/court.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'court-list',
  templateUrl: './list.component.html',
  providers: [CourtService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public courts: Court[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _courtService: CourtService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getCourts();
  }

  getCourts(){
    this._courtService.getCourts(this.token).subscribe(
      data => {
        this.courts  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteCourt(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._courtService.deleteCourt(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getCourts();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
