//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Exercise  } from '../../../models/exercise';
import { ExerciseService  } from '../../../services/exercise.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'exercises-list',
  templateUrl: './list.component.html',
  providers: [ExerciseService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public exercises: Exercise[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getExercises();
  }

  getExercises(){
    this._exerciseService.getExercises(this.token).subscribe(
      data => {
        this.exercises  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteExercise(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._exerciseService.deleteExercise(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getExercises();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
