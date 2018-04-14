import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Admin  } from '../../../models/admin';
import { AdminService  } from '../../../services/admin.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'admin-add',
  templateUrl: './add.component.html',
  providers: [AdminService, LoginService]
})
export class AddComponent implements OnInit {
  public title: string;
  public admin: Admin;
  public token: string;
  public url: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminService: AdminService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.admin = new Admin('','','','pass','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('admin-add component ha sido cargado!');
  }

  onSubmit(){
    console.log(this.admin);

    this._adminService.addAdmin(this.token,this.admin).subscribe(

      data =>{
        this.status= 'success';
        this.admin = new Admin('','','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }
}
