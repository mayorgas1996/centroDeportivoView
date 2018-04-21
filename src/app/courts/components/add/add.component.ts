import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Court  } from '../../../models/court';
import { CourtService  } from '../../../services/court.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'court-add',
  templateUrl: './add.component.html',
  providers: [CourtService, LoginService]
})
export class AddComponent implements OnInit {
  public title: string;
  public court: Court;
  public token: string;
  public url: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _courtService: CourtService,
    private _loginService: LoginService
  ){
    this.title = 'Crear Pista Deportiva';
    this.court = new Court('','','','','','','',true);
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('court-add component ha sido cargado!');
  }

  onSubmit(){
    console.log(this.court);

    this._courtService.addCourt(this.token,this.court).subscribe(

      data =>{
        this.status= 'success';
        this.court = new Court('','','','','','','',true);
      },
      err =>{
        this.status = 'error';
      }

    )

  }
}
