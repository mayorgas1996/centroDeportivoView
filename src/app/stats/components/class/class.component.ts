import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { Activity  } from '../../../models/activity';

import { ActivityService  } from '../../../services/activity.service';
import { StatsService  } from '../../../services/stats.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'stats-class',
  templateUrl: './class.component.html',
  providers: [StatsService, LoginService, ActivityService]

})
export class ClassComponent implements OnInit{
  public title:string;
  public indice:number;
  public token: string;
  public actividad: Activity;
  public activities: Activity[];

//Opciones para el gráfico de BARRAS
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      label: 'Nombre del ejercicio'
    }
  ];

//Opciones para el gráfico RADAR
  public radarChartLabels:string[];

  public radarChartData:any = [
    {data: [], label: 'Hombres'},
    {data: [], label: 'Mujeres'},
    {data: [], label: 'Otros'}
  ];
  public radarChartType:string = 'radar';

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
  private _loginService: LoginService,
  private _activityService: ActivityService

){
  this.title = 'Clases';
  this.indice = 0;
  this.token = this._loginService.getToken();

}

ngOnInit(){
  console.log("Obtneiendo actividades ...");
  this.getActivities();
  console.log("Actividades obtenidas");

}



getActivityAssist(id){
  this._statsService.getActivityAssist(this.token,id).subscribe(

    data =>{
      let clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].label = this.actividad.NOMBRE;

      if(data.length > 0){
        let i = 0;

        for(i ; i < data.length; i++ ){
          clone[0].data[(data[i].DIA_SEMANA-1)] = data[i].CANTIDAD;
        }



      }

      this.barChartData = clone;

    },
    err =>{
      console.log("Error " + err);
    }

  )

}


getActivityAssistByGender(){
  this._statsService.getActivityAssistByGender(this.token).subscribe(

    data =>{
      //Ver como hacer
      let clone = JSON.parse(JSON.stringify(this.radarChartData));

      if(data.length > 0){
        let i = 0;

        for(i ; i < data.length; i++ ){
          //HOMBRES
          clone[0].data.push(data[i].HOMBRES);
          //MUJERES
          clone[1].data.push(data[i].MUJERES);
          //Otros
          clone[2].data.push(data[i].OTROS);
        }

        this.radarChartData = clone;
      }

      this.barChartData = clone;

    },
    err =>{
      console.log("Error " + err);
    }

  )

}


getActivities(){
  this._activityService.getActivities(this.token).subscribe(
    data => {
      this.activities  = data;
      if(this.activities.length > 0){
        this.actividad = this.activities[0];
        this.getActivityAssist(this.actividad.ID_ACTIVIDAD);

        let i = 0;
        var clone = [];

        for(i; i < this.activities.length; i++){
          clone.push(this.activities[i].NOMBRE);
        }
        this.radarChartLabels = clone;

        this.getActivityAssistByGender();
      }
    },
    err => {
      console.log(<any>err);
    }
  )
}

repaint(){
  this.actividad = this.activities[this.indice];

  let i = 0;

  for(i; i < this.barChartData[0].data.length; i++){
      this.barChartData[0].data[i] = 0;
  }
  console.log("Obteniendo datos de la actividad " + this.actividad.ID_ACTIVIDAD);
  this.getActivityAssist(this.actividad.ID_ACTIVIDAD);
}

}
