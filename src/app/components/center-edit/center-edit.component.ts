import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Center  } from '../../models/center';
import { CenterService  } from '../../services/center.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'center-edit',
  templateUrl: './center-edit.component.html',
  providers: [CenterService, LoginService]

})
export class CenterEditComponent implements OnInit {
  public title:string;
  public center: Center;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.center = new Center('','','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('center-edit component cargado ... ');
    this.getCenter();
  }

  getCenter(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._centerService.getCenter(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un centeristrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.center = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this._centerService.updateCenter(this.token,this.center).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }

}
