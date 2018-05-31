import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { Court } from '../../../models/court';

import { CourtService  } from '../../../services/court.service';
import { StatsService  } from '../../../services/stats.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'stats-books',
  templateUrl: './books.component.html',
  providers: [CourtService, LoginService, StatsService]

})
export class BooksComponent {
  public title:string;
  public indice:number;
  public pista: Court;
  public courts: Court[];
  public token: string;

  //Opciones para el gráfico de BARRAS
    public barChartOptions:any = {
      scaleShowVerticalLines: false,
      responsive: true
    };
    public barChartLabels:string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
      {
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        label: 'Numero de reservas'
      }
    ];


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _statsService: StatsService,
    private _loginService: LoginService,
    private _courtService: CourtService
  ){
    this.title = 'Reservas ';
    this.indice = 0;
    this.token = this._loginService.getToken();

  }

  ngOnInit(){
    this.getCourts();
  }

  getCourts(){
    this._courtService.getCourts(this.token).subscribe(
      data => {
        this.courts  = data;
        if(this.courts.length > 0){
          this.pista = this.courts[0];
          this.getCourtBooks(this.pista.ID_PISTA);

        }
      },
      err => {
        console.log(<any>err);
      }
    )
  }



  getCourtBooks(id){
    this._statsService.getCourtBooks(this.token,id).subscribe(

      data =>{
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        console.log("Datos obtenidos: " + JSON.stringify(data));
        if(data.length > 0){
          let i = 0;

          for(i ; i < data.length; i++ ){
            clone[0].data[(data[i].MES-1)] = data[i].RESERVAS;
          }



        }

        this.barChartData = clone;

      },
      err =>{
        console.log("Error " + err);
      }

    )

  }


  repaint(){
    this.pista = this.courts[this.indice];

    let i = 0;

    for(i; i < this.barChartData[0].data.length; i++){
        this.barChartData[0].data[i] = 0;
    }

    this.getCourtBooks(this.pista.ID_PISTA);
  }

}
