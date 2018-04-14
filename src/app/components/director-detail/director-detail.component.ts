import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Director } from '../../models/director';
import { Center } from '../../models/center';
import { DirectorService  } from '../../services/director.service';
import { CenterService  } from '../../services/center.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'director-detail',
  templateUrl: './director-detail.component.html',
  providers: [DirectorService, LoginService, CenterService]

})
export class DirectorDetailComponent implements OnInit {
  public title:string;
  public director: Director;
  public token: string;
  public url: string;
  public center;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _directorService: DirectorService,
    private _centerService: CenterService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.director = new Director('','','','','','','','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('director-detail component cargado ... ');
    this.getDirector();

    console.log("Viendo el centro " + JSON.stringify(this.director));


  }

  getDirector(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._directorService.getDirector(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un director que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.director = data[0];
            var d = new Date(this.director.FECHA_NACIMIENTO);
            this.director.FECHA_NACIMIENTO = d.toISOString().slice(0,10).toString().replace('-','/').replace('-','/');
            this.getCenter(this.director.ID_CENTRO);

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
