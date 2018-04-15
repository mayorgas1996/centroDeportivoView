import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Finance  } from '../../../models/finance';
import { FinanceService } from '../../../services/finance.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'finances-add',
  templateUrl: './add.component.html',
  providers: [FinanceService, LoginService]
})

export class AddComponent {
  public title:string;
  public operacion: Finance;
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _financeService: FinanceService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.operacion = new Finance('','','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }


  onSubmit(){
    console.log(this.operacion);

    this._financeService.addFinance(this.token,this.operacion).subscribe(

      data =>{
        this.status= 'success';
        this.operacion = new Finance('','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }




}
