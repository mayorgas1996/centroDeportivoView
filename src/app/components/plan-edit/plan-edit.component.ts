import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Plan  } from '../../models/plan';
import { PlanService  } from '../../services/plan.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'plan-edit',
  templateUrl: './plan-edit.component.html',
  providers: [PlanService, LoginService]

})
export class PlanEditComponent implements OnInit {
  public title:string;
  public plan: Plan;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _planService: PlanService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.plan = new Plan('','','','',0,0,false,false,false);
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('plan-edit component cargado ... ');
    this.getPlan();
  }

  getPlan(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._planService.getPlan(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un planistrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.plan = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this._planService.updatePlan(this.token,this.plan).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }

  setActivo(activo){

    this.plan.ACTIVO = activo;
    this._planService.updatePlanStatus(this.token,this.plan).subscribe(
      data =>{
        this.status= 'success';
      },
      err =>{
        console.log(err);
        this.status = 'error';
      }
    )
  }

}
