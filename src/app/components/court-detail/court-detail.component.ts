import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Court  } from '../../models/court';
import { CourtService  } from '../../services/court.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'court-detail',
  templateUrl: './court-detail.component.html',
  providers: [CourtService, LoginService]

})
export class CourtDetailComponent implements OnInit {
  public title:string;
  public court: Court;
  public token: string;
  public url: string;
  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _courtService: CourtService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.court = new Court('','','','','','','',false);
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('court-detail component cargado ... ');
    this.getCourt();
  }

  getCourt(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._courtService.getCourt(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un administrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.court = data[0];
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }
}
