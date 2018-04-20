import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { User } from '../../../models/user';
import { Plan } from '../../../models/plan';
import { UserService  } from '../../../services/user.service';
import { PlanService  } from '../../../services/plan.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'users-add',
  templateUrl: './add.component.html',
  providers: [UserService, LoginService, PlanService]
})
export class AddComponent implements OnInit {
  public title: string;
  public user: User;
  public token: string;
  public url: string;
  public status: string;
  public plans: Plan[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _loginService: LoginService,
    private _planService: PlanService
  ){
    this.title = 'Crear';
    this.user = new User('','','pass','','','','','','','','','','',true,'','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('user-add component ha sido cargado!');
    this.getPlans();
  }

  onSubmit(){

    this.user.FECHA_FIN = this.user.FECHA_FIN.replace('-','/').replace('-','/');//split("-").reverse().join("/");
    this.user.FECHA_NAC = this.user.FECHA_NAC.replace('-','/').replace('-','/');

    console.log(this.user);


    this._userService.addUser(this.token,this.user).subscribe(

      data =>{
        console.log("ID_USUARIO: " + JSON.stringify(data));
        this.user.ID_USUARIO = data.ID_USUARIO;

        this._userService.assignPlan(this.token,this.user).subscribe(

          data =>{
            this.status= 'success';
            this.user = new User('','','pass','','','','','','','','','','',true,'','','');

          },
          err =>{
            this.status = 'error';

          }

        )


      },
      err =>{
        this.status = 'error';
      }

    )

  }


  getPlans(){
    this._planService.getPlans(this.token).subscribe(
      data => {
        this.plans = data;
      },
      err => {
        console.log("Fallo al obtener los planes");
      }
    )

  }

}
