import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Activity  } from '../../models/activity';
import { ActivityService  } from '../../services/activity.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'activity-detail',
  templateUrl: './activity-detail.component.html',
  providers: [ActivityService, LoginService]

})
export class ActivityDetailComponent implements OnInit {
  public title:string;
  public activity: Activity;
  public token: string;
  public url: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.activity = new Activity('','','','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('activity-detail component cargado ... ');
    this.getActivity();
  }

  getActivity(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._activityService.getActivity(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un administrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.activity = data[0];
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }
}
