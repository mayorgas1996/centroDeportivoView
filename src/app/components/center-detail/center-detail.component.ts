import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Center  } from '../../models/center';
import { CenterService  } from '../../services/center.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'center-detail',
  templateUrl: './center-detail.component.html',
  providers: [CenterService, LoginService]

})
export class CenterDetailComponent implements OnInit {
  public title:string;
  public center: Center;
  public token: string;
  public url: string;
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
    console.log('center-detail component cargado ... ');
    this.getCenter();
    console.log('Nombre center: ' + this.center.nombre);
  }

  getCenter(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._centerService.getCenter(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un administrador que no existe
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
}
