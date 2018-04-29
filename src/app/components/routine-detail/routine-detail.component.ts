import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Routine  } from '../../models/routine';
import { Exercise  } from '../../models/exercise';
import { RoutineService  } from '../../services/routine.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'routine-detail',
  templateUrl: './routine-detail.component.html',
  providers: [RoutineService, LoginService]

})
export class RoutineDetailComponent implements OnInit {
  public title:string;
  public routine: Routine;
  public token: string;
  public url: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _routineService: RoutineService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.routine = new Routine('','','',0,[],[],[]);
    this.token = this._loginService.getToken();

  }

  ngOnInit(){
    console.log('routine-detail component cargado ... ');
    this.getRoutine();
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
}
