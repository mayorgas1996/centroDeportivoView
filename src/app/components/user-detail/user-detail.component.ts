import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { Center } from '../../models/center';
import { UserService  } from '../../services/user.service';
import { CenterService  } from '../../services/center.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  providers: [UserService, LoginService, CenterService]

})
export class UserDetailComponent implements OnInit {
  public title:string;
  public user: User;
  public token: string;
  public url: string;
  public center;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','','','','',false,'','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('user-detail component cargado ... ');
    this.getUser();

    console.log("Viendo el centro " + JSON.stringify(this.user));


  }

  getUser(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._userService.getUser(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un user que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.user = data[0];
            console.log(this.user);
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  getCenter(id_centro){
    this._centerService.getCenter(this.token,id_centro).subscribe(
      data => {
        this.center = data[0].NOMBRE;
        console.log("Centro: " + this.center);
      },
      err => {
        console.log(<any>err);
      }
    )
  }



}
