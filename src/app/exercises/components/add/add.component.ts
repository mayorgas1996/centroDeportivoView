import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Exercise  } from '../../../models/exercise';
import { ExerciseService } from '../../../services/exercise.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'exercises-add',
  templateUrl: './add.component.html',
  providers: [ExerciseService, LoginService]
})

export class AddComponent {
  public title:string;
  public exercise: Exercise;
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService,
    private _loginService: LoginService
  ){
    this.title = 'Crear ejercicio';
    this.exercise = new Exercise('','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }


  onSubmit(){
    console.log(this.exercise);

    this._exerciseService.addExercise(this.token,this.exercise).subscribe(

      data =>{
        this.status= 'success';
        this.exercise = new Exercise('','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }




}
