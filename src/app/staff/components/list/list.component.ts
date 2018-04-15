//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Staff  } from '../../../models/staff';
import { StaffService  } from '../../../services/staff.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'staffs-list',
  templateUrl: './list.component.html',
  providers: [StaffService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public staffs: Staff[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _staffService: StaffService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getStaffs();
  }

  getStaffs(){
    this._staffService.getStaffs(this.token).subscribe(
      data => {
        this.staffs = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteStaff(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._staffService.deleteStaff(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getStaffs();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
