import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Director  } from '../../models/director';
import { DirectorService  } from '../../services/director.service';
import { CenterService  } from '../../services/center.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token
import { DatePipe } from '@angular/common'; //Manipulación de fechas

@Component({
  selector: 'director-edit',
  templateUrl: './director-edit.component.html',
  providers: [DirectorService, LoginService, CenterService,DatePipe]

})
export class DirectorEditComponent implements OnInit {
  public title:string;
  public director: Director;
  public token: string;
  public centers;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _directorService: DirectorService,
    private _centerService: CenterService,
    private _loginService: LoginService,
    private datePipe: DatePipe
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.director = new Director('','','','','','','','','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('director-edit component cargado ... ');
    this.getDirector();
    this.getCenters();
  }

  getDirector(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._directorService.getDirector(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un directoristrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.director = data[0];
            var d = new Date(this.director.FECHA_NACIMIENTO);
            this.director.FECHA_NACIMIENTO = d.toISOString().slice(0,10).toString().replace('-','/').replace('-','/');
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){
    this._directorService.updateDirector(this.token,this.director).subscribe(
      data =>{
        this.status= 'success';
      },
      err =>{
        console.log(err);
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
