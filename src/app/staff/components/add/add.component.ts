import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Staff  } from '../../../models/staff';
import { StaffService  } from '../../../services/staff.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'staff-add',
  templateUrl: './add.component.html',
  providers: [StaffService, LoginService]
})
export class AddComponent implements OnInit {
  public title: string;
  public staff: Staff;
  public token: string;
  public url: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _staffService: StaffService,
    private _loginService: LoginService
  ){
    this.title = 'Crear Técnico';
    this.staff = new Staff('','','','pass','','','','','','','','',false,false,'');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('staff-add component ha sido cargado!');
  }

  onSubmit(){
    console.log(this.staff);
    if(this.staff.DEPORTIVO)
    {
      this.staff.DEPORTIVO = true;
    }
    else
    {
      this.staff.ADMINISTRATIVO = true;
    }

    this._staffService.addStaff(this.token,this.staff).subscribe(

      data =>{
        this.status= 'success';
        this.staff = new Staff('','','','','','','','','','','','',false,false,'');
      },
      err =>{
        this.status = 'error';
      }

    )

  }

}
