//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Finance  } from '../../../models/finance';
import { FinanceService  } from '../../../services/finance.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'finances-list',
  templateUrl: './list.component.html',
  providers: [FinanceService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public finances: Finance[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _financeService: FinanceService,
    private _loginService: LoginService
  ){
    this.title = 'Últimas operaciones';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getFinances();
  }

  getFinances(){
    this._financeService.getFinances(this.token).subscribe(
      data => {
        console.log("Operaciones: " + JSON.stringify(data));
        this.finances  = data;

        for (let op of this.finances) {
            op.FECHA = op.FECHA.slice(0,10).toString().replace('-','/').replace('-','/');
        }

      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteFinance(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._financeService.deleteFinance(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getFinances();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
