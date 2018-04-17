//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Room  } from '../../../models/room';
import { RoomService  } from '../../../services/room.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'rooms-list',
  templateUrl: './list.component.html',
  providers: [RoomService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public rooms: Room[];
  public token: string;
  public status: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _roomService: RoomService,
    private _loginService: LoginService
  ){
    this.title = 'Listado de Salas';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getRooms();
  }

  getRooms(){
    this._roomService.getRooms(this.token).subscribe(
      data => {
        this.rooms = data;
        console.log("Salas: " + JSON.stringify(data));
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteRoom(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._roomService.deleteRoom(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getRooms();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

}
