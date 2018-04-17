import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Activity  } from '../../../models/activity';
import { ActivityService } from '../../../services/activity.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'activities-add',
  templateUrl: './add.component.html',
  providers: [ActivityService, LoginService]
})

export class AddComponent {
  public title:string;
  public activity: Activity;
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _loginService: LoginService
  ){
    this.title = 'Crear actividad';
    this.activity = new Activity('','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }


  onSubmit(){
    console.log(this.activity);

    this._activityService.addActivity(this.token,this.activity).subscribe(

      data =>{
        this.status= 'success';
        this.activity = new Activity('','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }




}
