//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { User } from '../../models/user';
import { Center } from '../../models/center';
import { Routine } from '../../models/routine';
import { Analysis } from '../../models/analysis';
import { UserService  } from '../../services/user.service';
import { CenterService  } from '../../services/center.service';
import { RoutineService  } from '../../services/routine.service';
import { AnalysisService  } from '../../services/analysis.service';

import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'user-status',
  templateUrl: './user-status.component.html',
  providers: [UserService, LoginService, CenterService,RoutineService,AnalysisService]

})
export class UserStatusComponent implements OnInit {
  public title:string;
  public user: User;
  public token: string;
  public url: string;
  public routine: Routine;
  public routines: Routine[];
  public analysis: Analysis;
  public analysis_anterior: Analysis;
  public status_routine: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _centerService: CenterService,
    private _loginService: LoginService,
    private _routineService: RoutineService,
    private _analysisService: AnalysisService

  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.user = new User('','','','','','','','','','','','','',false,'','','');
    this.token = this._loginService.getToken();
    this.routine = new Routine('','','',0,null,null,null);
    this.analysis = new Analysis('','','','','','','','','','','');
    this.analysis_anterior = new Analysis('','','','','','','','','','','');

  }

  ngOnInit(){
    console.log('user-status component cargado ... ');
    this.getUser();
    this.getUserRoutine();
    this.getUserAnalysis();
    this.getRoutines();

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
            console.log("Usuario cargado: " + JSON.stringify(this.user));
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  getUserRoutine(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._routineService.getUserRoutine(this.token,id).subscribe(
          data =>{
            console.log("resultado busqueda rutina: " + JSON.stringify(data));
            if(!data[0])
              this.routine = null;
            else
              this.routine = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  getUserAnalysis(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._analysisService.getUserAnalysis(this.token,id).subscribe(
          data =>{
            console.log("resultado busqueda analisis: " + JSON.stringify(data[0]));
            if(!data[0])
              this.analysis = null;
            else
              this.analysis = data[0];
            if(data[1])
              this.analysis_anterior = data[1];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  getRoutines(){
    this._routineService.getRoutines(this.token).subscribe(
      data => {
        this.routines  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  assignRoutine(){
    $('#myModal-'+this.user.ID_USUARIO).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta

    this._routineService.addRoutineToUser(this.token, this.routine.ID_RUTINA, this.user.ID_USUARIO).subscribe(
      data => {
        this.status_routine = 'success';
        this.getUserRoutine();
      },
      err => {
        console.log(<any>err);
        this.status_routine = 'error';
      }
    );

  }


}
