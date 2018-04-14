//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Admin  } from '../../../models/admin';
import { AdminService  } from '../../../services/admin.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'admin-list',
  templateUrl: './list.component.html',
  providers: [AdminService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public admins: Admin[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminService: AdminService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getAdmins();
  }

  getAdmins(){
    this._adminService.getAdmins(this.token).subscribe(
      data => {
        this.admins  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteAdmin(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._adminService.deleteAdmin(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getAdmins();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
