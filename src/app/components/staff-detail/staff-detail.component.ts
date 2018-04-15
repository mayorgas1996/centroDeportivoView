import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Staff } from '../../models/staff';
import { StaffService  } from '../../services/staff.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'staff-detail',
  templateUrl: './staff-detail.component.html',
  providers: [StaffService, LoginService]

})
export class StaffDetailComponent implements OnInit {
  public title:string;
  public staff: Staff;
  public token: string;
  public url: string;
  public center;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _staffService: StaffService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.staff = new Staff('','','','','','','','','','','','',false,false,'');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('staff-detail component cargado ... ');
    this.getStaff();
  }

  getStaff(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._staffService.getStaff(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un staff que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.staff = data[0];
            var d = new Date(this.staff.FECHA_NACIMIENTO);
            this.staff.FECHA_NACIMIENTO = d.toISOString().slice(0,10).toString().replace('-','/').replace('-','/');

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

}
