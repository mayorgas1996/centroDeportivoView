import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Admin  } from '../../models/admin';
import { AdminService  } from '../../services/admin.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'admin-edit',
  templateUrl: './admin-edit.component.html',
  providers: [AdminService, LoginService]

})
export class AdminEditComponent implements OnInit {
  public title:string;
  public admin: Admin;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _adminService: AdminService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.admin = new Admin('','','','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('admin-edit component cargado ... ');
    this.getAdmin();
  }

  getAdmin(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._adminService.getAdmin(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un administrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.admin = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this._adminService.updateAdmin(this.token,this.admin).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }

}
