//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Plan  } from '../../../models/plan';
import { PlanService  } from '../../../services/plan.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'plans-list',
  templateUrl: './list.component.html',
  providers: [PlanService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public plans: Plan[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getPlans();
  }

  getPlans(){
    this._planService.getPlans(this.token).subscribe(
      data => {
        this.plans  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deletePlan(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._planService.deletePlan(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getPlans();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
