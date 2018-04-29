import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Room  } from '../../models/room';
import { RoomService  } from '../../services/room.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'room-edit',
  templateUrl: './room-edit.component.html',
  providers: [RoomService, LoginService]

})
export class RoomEditComponent implements OnInit {
  public title:string;
  public room: Room;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _roomService: RoomService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.room = new Room('','', 0, false);
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('room-edit component cargado ... ');
    this.getRoom();
  }

  getRoom(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._roomService.getRoom(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un roomistrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.room = data[0];

          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){

    this._roomService.updateRoom(this.token,this.room).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }

  setActivo(activo){
    this.room.ACTIVO = activo;
    this._roomService.updateRoomStatus(this.token,this.room).subscribe(

      data =>{
        this.status= 'success';
      },
      err =>{
        this.status = 'error';
      }

    )

  }


}
