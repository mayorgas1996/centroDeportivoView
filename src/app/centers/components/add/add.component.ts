import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Center  } from '../../../models/center';
import { CenterService  } from '../../../services/center.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'center-add',
  templateUrl: './add.component.html',
  providers: [CenterService, LoginService]
})
export class AddComponent implements OnInit {
  public title: string;
  public center: Center;
  public token: string;
  public url: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.center = new Center('','','','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('center-add component ha sido cargado!');
  }

  onSubmit(){
    console.log(this.center);

    this._centerService.addCenter(this.token,this.center).subscribe(

      data =>{
        this.status= 'success';
        this.center = new Center('','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }
}
