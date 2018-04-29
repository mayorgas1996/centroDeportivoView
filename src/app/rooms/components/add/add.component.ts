import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { Room  } from '../../../models/room';
import { RoomService } from '../../../services/room.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'rooms-add',
  templateUrl: './add.component.html',
  providers: [RoomService, LoginService]
})

export class AddComponent {
  public title:string;
  public room: Room;
  public token: string;
  public status: string;
  public url : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _roomService: RoomService,
    private _loginService: LoginService
  ){
    this.title = 'Crear';
    this.room = new Room('','', 0, true);
    this.token = this._loginService.getToken();
    this.url = GLOBAL.url;
  }


  onSubmit(){
    console.log(this.room);

    this._roomService.addRoom(this.token,this.room).subscribe(

      data =>{
        this.status= 'success';
        this.room = new Room('','',0,true);
      },
      err =>{
        this.status = 'error';
      }

    )

  }




}
