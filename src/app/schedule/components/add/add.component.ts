declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Activity  } from '../../../models/activity';
import { Room  } from '../../../models/room';
import { Staff } from '../../../models/staff';
import { Schedule } from '../../../models/schedule';
import { ActivityService } from '../../../services/activity.service';
import { RoomService  } from '../../../services/room.service';
import { StaffService } from '../../../services/staff.service';
import { LoginService } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'schedule-add',
  templateUrl: './add.component.html',
  providers: [ActivityService, LoginService, StaffService, RoomService]
})

export class AddComponent {
  public title:string;
  public schedule: Schedule;
  public activities: Activity[];
  public rooms: Room[];
  public staffs: Staff[];
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _loginService: LoginService,
    private _staffService: StaffService,
    private _roomService: RoomService,
  ){
    this.title = 'Configurar horario';
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
    this.schedule = new Schedule('',1,'','','','','','','');
    this.staffs = [];
    this.rooms = [];
    this.getActivities();
    //this.getStaffs();
    //this.getRooms();
  }


  onSubmit(){
    console.log("Datos a enviar: " + JSON.stringify(this.schedule));
    this._activityService.addImpartida(this.token,this.schedule).subscribe(

      data =>{
        this.status= 'success';
        this.schedule = new Schedule('',1,'','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }

  getActivities(){
    this._activityService.getActivities(this.token).subscribe(
      data => {
        this.activities = data;
        console.log("Las actividades han sido obtenidas");
        console.log(JSON.stringify(this.activities));
      },
      err => {
        console.log("Fallo al obtener las actividades");
      }
    )

  }

  verDisponibilidadStaff(){

    //Si se deja algún campo vacio no se mostrará ningún técnico
    if(this.schedule.DIA_SEMANA == undefined || this.schedule.HORA_INICIO == undefined || this.schedule.HORA_FIN == undefined){
      this.staffs = null;
      this.rooms = null;
    }
    else{ //Vemos cuales son los técnicos disponibles para dicho dia y dicha franja horaria
      this._activityService.getStaffAvailable(this.token,this.schedule).subscribe(

        data =>{
          this.staffs = data;

        },
        err =>{
          this.status = 'error';
        }
      )
    }
  }

  verDisponibilidadSala(){

    //Si se deja algún campo vacio no se mostrará ningún técnico
    if(this.schedule.DIA_SEMANA == undefined || this.schedule.HORA_INICIO == undefined || this.schedule.HORA_FIN == undefined){
      this.staffs = null;
      this.rooms = null;
    }
    else{ //Vemos cuales son los técnicos disponibles para dicho dia y dicha franja horaria
      this._activityService.getRoomsAvailable(this.token,this.schedule).subscribe(

        data =>{
          this.rooms = data;

        },
        err =>{
          this.status = 'error';
        }
      )
    }
  }



}
