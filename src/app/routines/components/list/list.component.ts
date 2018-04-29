//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Routine  } from '../../../models/routine';
import { RoutineService  } from '../../../services/routine.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'routine-list',
  templateUrl: './list.component.html',
  providers: [RoutineService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public routines: Routine[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routineService: RoutineService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getRoutines();
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

  deleteRoutine(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._routineService.deleteRoutine(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getRoutines();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
