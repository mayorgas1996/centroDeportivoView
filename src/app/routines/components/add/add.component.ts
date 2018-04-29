import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Routine  } from '../../../models/routine';
import { Exercise  } from '../../../models/exercise';
import { RoutineService } from '../../../services/routine.service';
import { ExerciseService } from '../../../services/exercise.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'routines-add',
  templateUrl: './add.component.html',
  providers: [RoutineService, LoginService, ExerciseService]
})

export class AddComponent implements OnInit{
  public title:string;
  public routine: Routine;
  public ejercicios: Exercise[];
  public serie: number;
  public repeticion: number;
  public token: string;
  public status: string;
  public url : string;
  public vista_ejercicio: boolean;
  public exercise: Exercise;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routineService: RoutineService,
    private _exerciseService: ExerciseService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.routine = new Routine('','','',0,null,null,null);
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
    this.vista_ejercicio = false;
    this.ejercicios = [];
    this.routine.SERIES = [];
    this.routine.REPETICIONES = [];
    this.exercise = new Exercise('','','','','');

  }

  ngOnInit(){
    this.getExercises();
  }

  getExercises(){
    this._exerciseService.getExercises(this.token).subscribe(
      data => {
        this.ejercicios  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }


  onSubmit(){
    console.log(this.routine);

    this._routineService.addRoutine(this.token,this.routine).subscribe(

      data =>{
        console.log("Rutina creada con exito " + JSON.stringify(data));
        this.routine.ID_RUTINA = data.ID;

        this._routineService.addExercisesToRutine(this.token,this.routine).subscribe(
          data =>{
            this.status= 'success';
            this.routine = new Routine('','','',0,null,null,null);
          },
          err =>{
            this.status = 'error';
          }
        )


      },
      err =>{
        this.status = 'error';
      }

    )

  }


  addRutina(){
    this.routine.SERIES.push(this.serie);
    this.routine.REPETICIONES.push(this.repeticion);
    this.getExercise(this.exercise.ID_EJERCICIO);
console.log("Series contiene: " + this.routine.SERIES.toString());
console.log("Repeticiones contiene: " + this.routine.REPETICIONES.toString());
    this.vista_ejercicio = false;

  }

  getExercise(id){
    this._exerciseService.getExercise(this.token,id).subscribe(
      data =>{
        this.exercise = data[0];
        this.routine.EJERCICIOS.push(this.exercise);
        this.exercise = new Exercise('','','','','');
      },
      err =>{
        console.log(<any>err);
      }
    )}

    removeOfRoutine(index){

      this.routine.SERIES.splice(index,1);
      this.routine.REPETICIONES.splice(index,1);
      this.routine.EJERCICIOS.splice(index,1);

    }

  }
