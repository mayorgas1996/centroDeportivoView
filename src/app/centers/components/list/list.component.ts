//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Center  } from '../../../models/center';
import { CenterService  } from '../../../services/center.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'center-list',
  templateUrl: './list.component.html',
  providers: [CenterService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public centers: Center[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getCenters();
  }

  getCenters(){
    this._centerService.getCenters(this.token).subscribe(
      data => {
        this.centers  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteCenter(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._centerService.deleteCenter(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getCenters();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
