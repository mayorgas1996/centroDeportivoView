import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Exercise  } from '../../models/exercise';
import { ExerciseService  } from '../../services/exercise.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'exercise-edit',
  templateUrl: './exercise-edit.component.html',
  providers: [ExerciseService, LoginService]

})
export class ExerciseEditComponent implements OnInit {
  public title:string;
  public exercise: Exercise;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _exerciseService: ExerciseService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.exercise = new Exercise('','','','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('exercise-edit component cargado ... ');
    this.getExercise();
  }

  getExercise(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._exerciseService.getExercise(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un exerciseistrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.exercise = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this._exerciseService.updateExercise(this.token,this.exercise).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }

}
