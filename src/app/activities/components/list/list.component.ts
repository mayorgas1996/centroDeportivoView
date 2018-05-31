//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Activity  } from '../../../models/activity';
import { ActivityService  } from '../../../services/activity.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'activities-list',
  templateUrl: './list.component.html',
  providers: [ActivityService, LoginService]

})

export class ListComponent implements OnInit {
  public title:string;
  public activities: Activity[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getActivities();
  }

  getActivities(){
    this._activityService.getActivities(this.token).subscribe(
      data => {
        console.log("Actividades: " + JSON.stringify(data));
        this.activities  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteActivity(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._activityService.deleteActivity(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getActivities();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
