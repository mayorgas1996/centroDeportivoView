import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { StatsService  } from '../../../services/stats.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'stats-finances',
  templateUrl: './finances.component.html',
  providers: [StatsService, LoginService]

})

export class FinancesComponent implements OnInit{
  public title:string;
  public token:string;

  public lineChartData:Array<any> = [
  {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Gastos'},
  {data: [0,0,0,0,0,0,0,0,0,0,0,0], label: 'Ingresos'}

];
public lineChartLabels:Array<any> = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio','Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
public lineChartOptions:any = {
  responsive: true
};

public lineChartLegend:boolean = true;
public lineChartType:string = 'line';

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
    this.title = 'Financieras';
    this.token = this._loginService.getToken();

  }

  ngOnInit(){
    this.getFinancialSummary();
  }

  getFinancialSummary(){
    this._statsService.getFinancialSummary(this.token).subscribe(

      data =>{
        //Ver como hacer
        let clone = JSON.parse(JSON.stringify(this.lineChartData));

        if(data.length > 0){
          let i = 0;
          for(i; i < data.length; i++){
            if(data[i].GASTOS == null){
              clone[0].data[(data[i].MES-1)] = 0;
            }
            else{
              clone[0].data[(data[i].MES-1)] = data[i].GASTOS*(-1);
            }
            if(data[i].INGRESOS == null){
              clone[1].data[(data[i].MES-1)] = 0;
            }
            else{
              clone[1].data[(data[i].MES-1)] = data[i].INGRESOS;
            }
          }

        }

        this.lineChartData = clone;

      },
      err =>{
        console.log("Error " + err);
      }

    )

  }

}
