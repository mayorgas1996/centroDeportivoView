import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { StatsService  } from '../../../services/stats.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'stats-users',
  templateUrl: './users.component.html',
  providers: [StatsService, LoginService]

})
export class UsersComponent {
  public title:string;
  public token:string;

  //Gráfico para mostrar los apuntados en el centro deportivo
  public doughnutChartLabels:string[] = ['Hombres', 'Mujeres', 'Otro'];
  public doughnutChartData:number[] = [0, 0, 0];
  public doughnutChartType:string = 'doughnut';

  //Gráfico para mostrar por rango de edad los apuntados al centro deportivo
  public doughnutChartLabelsAge:string[] = ['Menores 20', '20-25', '26-30', '31-40', '41-50', 'Más de 50'];
  public doughnutChartDataAge:number[] = [0, 0, 0, 0, 0, 0];

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
    this.title = 'Usuarios';
    this.token = this._loginService.getToken();

  }

  ngOnInit(){
    this.getUsersSummary();
    this.getUsersAgeSummary();
  }

  getUsersSummary(){
    this._statsService.getUsersSummary(this.token).subscribe(

      data =>{
        //Ver como hacer
        let clone = JSON.parse(JSON.stringify(this.doughnutChartData));

        if(data.length > 0){

          let i = 0;

          for(i; i < data.length; i++){

            if(data[i].SEXO == 'Hombre'){
              clone[0] = data[i].USUARIOS;
            }
            else if(data[i].SEXO == 'Mujer'){
              clone[1] = data[i].USUARIOS;
            }
            else{
              clone[2] = data[i].USUARIOS;
            }

          }

        }

        this.doughnutChartData = clone;

      },
      err =>{
        console.log("Error " + err);
      }

    )

  }

  getUsersAgeSummary(){
    this._statsService.getUsersAgeSummary(this.token).subscribe(

      data =>{
        //Ver como hacer
        let clone = JSON.parse(JSON.stringify(this.doughnutChartDataAge));

        if(data.length > 0){

          let i = 0;

          for(i; i < data.length; i++){

            clone[i] = data[i].RANGOS;
          }

        }

        this.doughnutChartDataAge = clone;

      },
      err =>{
        console.log("Error " + err);
      }

    )

  }


}
