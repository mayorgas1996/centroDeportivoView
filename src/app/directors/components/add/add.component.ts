import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Director  } from '../../../models/director';
import { DirectorService  } from '../../../services/director.service';
import { CenterService  } from '../../../services/center.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'directors-add',
  templateUrl: './add.component.html',
  providers: [DirectorService, LoginService,CenterService]
})
export class AddComponent implements OnInit {
  public title: string;
  public director: Director;
  public centers;
  public token: string;
  public url: string;
  public status: string;
  public id_center_choose;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _directorService: DirectorService,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.director = new Director('','','','pass','','','','','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(){
    console.log('director-add component ha sido cargado!');
    this.getCenters();
    console.log("Centros: " + JSON.stringify(this.centers));
  }

  onSubmit(){
    console.log(this.director);

    this._directorService.addDirector(this.token,this.director).subscribe(

      data =>{
        this.status= 'success';
        this.director = new Director('','','','','','','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }

  getCenters(){
    this._centerService.getCenters(this.token).subscribe(
      data => {
        this.centers  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

}
