//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Schedule  } from '../../../models/schedule';
import { ActivityService  } from '../../../services/activity.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'schedule-list',
  templateUrl: './list.component.html',
  providers: [ActivityService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public schedules: Schedule[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _loginService: LoginService
  ){
    this.title = 'Horario de actividades';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getCalendario();
    console.log(JSON.stringify(this.schedules));
  }

  getCalendario(){
    this._activityService.getSchedule(this.token).subscribe(
      data => {
        this.schedules = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

/*
  deleteActivity(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._courtService.deleteActivity(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getActivitys();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }*/

}
