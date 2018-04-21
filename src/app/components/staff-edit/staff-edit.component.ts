import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Staff  } from '../../models/staff';
import { StaffService  } from '../../services/staff.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token
import { DatePipe } from '@angular/common'; //Manipulación de fechas

@Component({
  selector: 'staff-edit',
  templateUrl: './staff-edit.component.html',
  providers: [StaffService, LoginService,DatePipe]

})
export class StaffEditComponent implements OnInit {
  public title:string;
  public staff: Staff;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _staffService: StaffService,
    private _loginService: LoginService,
    private datePipe: DatePipe
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.staff = new Staff('','','','','','','','','','','','',false,false,'',false,false);
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('staff-edit component cargado ... ');
    this.getStaff();
  }

  getStaff(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._staffService.getStaff(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un staffistrador que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.staff = data[0];
            var d = new Date(this.staff.FECHA_NACIMIENTO);
            this.staff.FECHA_NACIMIENTO = d.toISOString().slice(0,10).toString().replace('-','/').replace('-','/');
            this.staff.ADMINISTRATIVO = false;
            this.staff.DEPORTIVO = false;
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){
    console.log("Valores DEPORTIVO: " + this.staff.DEPORTIVO + " ADMINISTRATIVO: " + this.staff.ADMINISTRATIVO );
    if(this.staff.DEPORTIVO != false)
    {
      this.staff.DEPORTIVO = true;
      this.staff.ADMINISTRATIVO = false;
    }
    else if(this.staff.ADMINISTRATIVO != false)
    {
      this.staff.ADMINISTRATIVO = true;
      this.staff.DEPORTIVO = false;
    }

    this._staffService.updateStaff(this.token,this.staff).subscribe(
      data =>{
        this.status= 'success';
      },
      err =>{
        console.log(err);
        this.status = 'error';
      }

    )

  }


  setEstado(baja){

    this.staff.BAJA = baja;
    this._staffService.updateStaffContract(this.token,this.staff).subscribe(
      data =>{
        this.status= 'success';
      },
      err =>{
        console.log(err);
        this.status = 'error';
      }
    )
  }


  setActivo(activo){

    this.staff.ACTIVO = activo;
    this._staffService.updateStaffContract(this.token,this.staff).subscribe(
      data =>{
        this.status= 'success';
      },
      err =>{
        console.log(err);
        this.status = 'error';
      }
    )
  }

}
