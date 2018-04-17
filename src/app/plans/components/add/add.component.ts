import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Plan  } from '../../../models/plan';
import { PlanService } from '../../../services/plan.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'plans-add',
  templateUrl: './add.component.html',
  providers: [PlanService, LoginService]
})

export class AddComponent {
  public title:string;
  public plan: Plan;
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _loginService: LoginService
  ){
    this.title = 'Crear Plan';
    this.plan = new Plan('','','','',18,0,false,false);
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }


  onSubmit(){
    console.log(this.plan);


    this._planService.addPlan(this.token,this.plan).subscribe(

      data =>{
        this.status= 'success';
        this.plan = new Plan('','','','',18,0,false,false);
      },
      err =>{
        this.status = 'error';
      }

    )

  }




}
