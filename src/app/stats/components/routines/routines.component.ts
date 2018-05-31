import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { StatsService  } from '../../../services/stats.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'stats-routines',
  templateUrl: './routines.component.html',
  providers: [StatsService, LoginService]
})
export class RoutinesComponent {
  public title:string;
  public token:string;

  public doughnutChartLabels:string[] = [];
  public doughnutChartData:number[] = [];
  public doughnutChartType:string = 'doughnut';


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _statsService: StatsService,
    private _loginService: LoginService
  ){
    this.title = 'Rutinas';
    this.token = this._loginService.getToken();

  }

  ngOnInit(){
    this.getRoutinesInformation();
  }

  getRoutinesInformation(){
    this._statsService.getRoutinesInformation(this.token).subscribe(

      data =>{

        console.log("Datos rutina: " + data[0].NOMBRE);
        let clone_labels= JSON.parse(JSON.stringify(this.doughnutChartLabels));
        let clone_data = JSON.parse(JSON.stringify(this.doughnutChartData));;

        console.log("Labels antes: " + this.doughnutChartLabels.length);
        console.log("Data antes: " + this.doughnutChartData.length);

        if(data.length > 0){

          let i = 0;

          for(i; i < data.length; i++){

            clone_labels.push(data[i].NOMBRE);
            clone_data.push(data[i].PERSONAS);

          }

        }

        this.doughnutChartLabels = clone_labels;
        this.doughnutChartData = clone_data;

        console.log("Labels despues: " + this.doughnutChartLabels.length);
        console.log("Data despues: " + this.doughnutChartData.length);

      },
      err =>{
        console.log("Error " + err);
      }

    )

  }

}
