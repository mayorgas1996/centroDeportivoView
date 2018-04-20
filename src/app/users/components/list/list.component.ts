//Para poder borrar cuando se queda pillado el pop up
declare var jQuery:any;
declare var $:any;

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../../services/global';
import { User  } from '../../../models/user';
import { UserService  } from '../../../services/user.service';
import { LoginService  } from '../../../services/login.service'; //Para obtener el token

@Component({
  selector: 'user-list',
  templateUrl: './list.component.html',
  providers: [UserService, LoginService]

})
export class ListComponent implements OnInit {
  public title:string;
  public users: User[];
  public token: string;
  public status: string;
  public fecha_calculada:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _loginService: LoginService
  ){
    this.title = 'Listar';
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    this.getUsers();
  }

  getUsers(){
    this._userService.getActiveUsers(this.token).subscribe(
      data => {
        this.users  = data;
      },
      err => {
        console.log(<any>err);
      }
    )
  }

  deleteUser(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta
    this._userService.deleteUser(this.token,id).subscribe(
      data =>{
        this.status="success";
        this.getUsers();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

  renewUser(id){
    //Uso de jQuery para el ocultamiento del modal (ventana de confirmación)
    $('#myModal-'+id).modal('hide'); //Para ocultar el modal emergente ya que por si no se oculta

    this.fecha_calculada = this.fecha_calculada.split("/").reverse().join("/");
    this._userService.renewUser(this.token,id,this.fecha_calculada).subscribe(
      data =>{
        this.status="success";
        this.getUsers();
      },
      err =>{
        this.status="error";
        console.log(<any>err);
      }
    )
  }

  ultimoDia(fecha_fin) {
    var sep = fecha_fin.split('/');
    var mes = parseInt(sep[1])+1;
    var anno = parseInt(sep[2]);
    if(mes == 13){
      mes = 1;
      anno = anno+1;
    }

    if (mes == 1 || mes ==3 || mes ==5 || mes ==7 || mes ==8 || mes ==10 || mes ==12) {
	     this.fecha_calculada = 31+"/"+mes.toString()+"/"+anno.toString();
		}
    else {
      if( mes == 2){
        if( anno % 4 == 0){
          this.fecha_calculada = 29+"/"+mes.toString()+"/"+anno.toString();
        }
        else{
            this.fecha_calculada = 28+"/"+mes.toString()+"/"+anno.toString();
        }
      }
      else{
	       this.fecha_calculada = 30+"/"+mes.toString()+"/"+anno.toString();
       }
     }
   }
}
