import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Finance  } from '../../models/finance';
import { FinanceService  } from '../../services/finance.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token
import { DatePipe } from '@angular/common'; //Manipulación de fechas

@Component({
  selector: 'finance-edit',
  templateUrl: './finance-edit.component.html',
  providers: [FinanceService, LoginService, ,DatePipe]

})
export class FinanceEditComponent implements OnInit {
  public title:string;
  public finance: Finance;
  public token: string;
  public centers;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _financeService: FinanceService,
    private _loginService: LoginService,
    private datePipe: DatePipe
  ){
    this.title = 'Modificar';
    this.url = GLOBAL.url;
    this.finance = new Finance('','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('finance-edit component cargado ... ');
    this.getFinance();
  }

  getFinance(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._financeService.getFinance(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de una operación que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.finance = data[0];
            var d = new Date(this.finance.FECHA);
            this.finance.FECHA = d.toISOString().slice(0,10).toString().replace('-','/').replace('-','/');
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){
    this._financeService.updateFinance(this.token,this.finance).subscribe(
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
