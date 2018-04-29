import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Routine  } from '../../models/routine';
import { Exercise  } from '../../models/exercise';
import { RoutineService } from '../../services/routine.service';
import { ExerciseService } from '../../services/exercise.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'routine-edit',
  templateUrl: './routine-edit.component.html',
  providers: [RoutineService, LoginService, ExerciseService]
})

export class RoutineEditComponent implements OnInit{
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
  public size: number;

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
    this.routine.EJERCICIOS = [];
    this.routine.SERIES = [];
    this.routine.REPETICIONES = [];
    this.exercise = new Exercise('','','','','');
    this.size = 0;
  }

  ngOnInit(){
    console.log('routine-edit component cargado ... ');
    this.getRoutine();
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

    this._routineService.updateRoutine(this.token,this.routine).subscribe(

      data =>{

        this._routineService.addExercisesToRutine(this.token,this.routine).subscribe(
          data =>{
            this.status= 'success';
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

  getRoutine(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._routineService.getRoutine(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de una rutina que no existe
              this._router.navigate(['/home']); //Redirección al home
            }
            this.routine = data[0];
            console.log("Rutina obtenida: " + JSON.stringify(this.routine));

            this._routineService.getExercisesRoutine(this.token,id).subscribe(
              data =>{
                if(!data){ //Aquí entra cuando se quiere acceder al ID de una rutina que no existe
                  this._router.navigate(['/home']); //Redirección al home
                }

                var i;

                this.routine.EJERCICIOS = [];
                this.routine.SERIES = [];
                this.routine.REPETICIONES = [];
                this.size = data.length;
                for(i = 0; i < data.length; i++){
                  this.routine.EJERCICIOS.push(new Exercise(data[i].ID_EJERCICIO,data[i].NOMBRE,data[i].GRUPO_MUSCULAR,data[i].DIFICULTAD,data[i].INFORMACION));
                  this.routine.SERIES.push(data[i].SERIES);
                  this.routine.REPETICIONES.push(data[i].REPETICIONES);
                }

              },
              err =>{
                this._router.navigate(['/home']);
                console.log(<any>err);
              }
            )
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }


  addRutina(){
    this.routine.SERIES.push(this.serie);
    this.routine.REPETICIONES.push(this.repeticion);
    this.getExercise(this.exercise.ID_EJERCICIO);

    this.vista_ejercicio = false;

  }

  getExercise(id){
    this._exerciseService.getExercise(this.token,id).subscribe(
      data =>{
        this.exercise = data[0];
        this.routine.EJERCICIOS.push(this.exercise);
        this.exercise = new Exercise('','','','','');
        this.size += 1;
      },
      err =>{
        console.log(<any>err);
      }
    )}

    removeOfRoutine(index){

      this.routine.SERIES.splice(index,1);
      this.routine.REPETICIONES.splice(index,1);
      this.routine.EJERCICIOS.splice(index,1);
      this.size -= 1;
    }

  }
