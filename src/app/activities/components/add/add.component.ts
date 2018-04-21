import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Activity  } from '../../../models/activity';
import { Room  } from '../../../models/room';
import { Staff } from '../../../models/staff';
import { ActivityService } from '../../../services/activity.service';
import { RoomService  } from '../../../services/room.service';
import { StaffService } from '../../../services/staff.service';
import { LoginService } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'activities-add',
  templateUrl: './add.component.html',
  providers: [ActivityService, LoginService, StaffService, RoomService]
})

export class AddComponent {
  public title:string;
  public activity: Activity;
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
    this.title = 'Crear actividad';
    this.activity = new Activity('','','','','','','');
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
    this.staffs = [];
    this.rooms = [];
    this.getStaffs();
    this.getRooms();
  }


  onSubmit(){
    console.log(this.activity);

    this._activityService.addActivity(this.token,this.activity).subscribe(

      data =>{
        this.status= 'success';
        this.activity = new Activity('','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }

  getRooms(){
    this._roomService.getRooms(this.token).subscribe(
      data => {
        this.rooms = data;
      },
      err => {
        console.log("Fallo al obtener las salas");
      }
    )

  }

  getStaffs(){
    this._staffService.getStaffs(this.token).subscribe(
      data => {
        //Lo que viene a continuación es un filtrado para mostrar aquellos
        //técnicos que sean deportivos, que estén activos y no esten dados de baja en
        // el sistema
        var aux:Staff[];
        aux = data;
        for (let staff of data) {
          if(!staff.BAJA && staff.ACTIVO && staff.DEPORTIVO){
            this.staffs.push(staff);
          }
        }

      },
      err => {
        console.log("Fallo al obtener los tecnicos");
      }
    )

  }


}
