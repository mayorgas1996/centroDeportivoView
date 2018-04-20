import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { User  } from '../../models/user';
import { Plan  } from '../../models/plan';
import { UserService  } from '../../services/user.service';
import { PlanService  } from '../../services/plan.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'user-edit',
  templateUrl: './user-edit.component.html',
  providers: [UserService, LoginService, PlanService]

})
export class UserEditComponent implements OnInit {
  public title:string;
  public user: User;
  public token: string;
  public url: string;
  public status:string;
  public plans: Plan[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _planService: PlanService,
    private _loginService: LoginService
    ){
    this.title = 'Actualizar';
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','','','','',false,'','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('user-edit component cargado ... ');
    this.getPlans();
    this.getUser();

  }

  getUser(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._userService.getUser(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un useristrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.user = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this.user.FECHA_FIN = this.user.FECHA_FIN.replace('-','/').replace('-','/');//split("-").reverse().join("/");
    this.user.FECHA_NAC = this.user.FECHA_NAC.replace('-','/').replace('-','/');

    this._userService.updateUser(this.token,this.user).subscribe(
      data =>{
        this.status= 'success';
        this.user.FECHA_FIN = this.user.FECHA_FIN.replace('/','-').replace('/','-');//split("-").reverse().join("/");
        this.user.FECHA_NAC = this.user.FECHA_NAC.replace('/','-').replace('/','-');

      },
      err =>{
        console.log(err);
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

  setActivo(activo){

    this.user.FECHA_FIN = this.user.FECHA_FIN.replace('-','/').replace('-','/');//split("-").reverse().join("/");
    this.user.FECHA_NAC = this.user.FECHA_NAC.replace('-','/').replace('-','/');
    this.user.ACTIVO = activo;
    this._userService.updateUserPlan(this.token,this.user).subscribe(
      data =>{
        this.status= 'success';
        this.user.FECHA_FIN = this.user.FECHA_FIN.replace('/','-').replace('/','-');//split("-").reverse().join("/");
        this.user.FECHA_NAC = this.user.FECHA_NAC.replace('/','-').replace('/','-'); 
      },
      err =>{
        console.log(err);
        this.status = 'error';
      }

    )

  }

}
