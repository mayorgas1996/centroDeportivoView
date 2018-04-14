import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL }  from '../../services/global';
import { ProfileService  } from '../../services/profile.service';
import { My_Profile } from '../../models/my_profile';

@Component(
  {
    selector: 'my-profile',
    templateUrl: './my_profile.component.html',
    providers: [ProfileService]
  }
)

export class MyProfileComponent implements OnInit{

  public title: string;
  public my_profile: My_Profile;
  public rol: string;
  public status:string;

  constructor(
    private _profileService: ProfileService
  ){
    this.title = 'Actualiza mis datos';
    this.my_profile = new My_Profile(localStorage.getItem('nombre'),'','','','','','');
    this.rol   = localStorage.getItem('rol');
  }
  ngOnInit(){
    console.log('my_profile.component cargado con exito!');

      this._profileService.getMyProfile().subscribe(

        data => {
          console.log('DATOS PERFIL: ' + JSON.stringify(data));
          let datos = JSON.stringify(data);
          datos = datos.slice(1,-1); //Quitamos la llave ({) del principio y del final para despues poder tratarlo como un JSON
          let datosJSON = JSON.parse(datos); //Lo convertimos a JSON

            console.log("Email: " + JSON.stringify(datosJSON.EMAIL) );

            this.my_profile.email     = datosJSON.EMAIL;
            this.my_profile.domicilio = datosJSON.DOMICILIO ;
            this.my_profile.municipio = datosJSON.MUNICIPIO ;
            this.my_profile.provincia = datosJSON.PROVINCIA ;
            this.my_profile.telefono  = datosJSON.TELEFONO ;

        },
        err => {
          console.log('ERROR PERFIL: ' + JSON.stringify(err));
        }

      );

  }

  onSubmit(){
    this._profileService.updateProfile(this.my_profile).subscribe(

            //Usuario ha podido actualizar su perfil correctamente
            data => {
              this.status='success';
              localStorage.setItem('email',this.my_profile.email);
              localStorage.setItem('nombre',this.my_profile.nombre);
            },
            err => {
              console.log("Error: " + JSON.stringify(err));
              this.status= 'error';
            }
          );
        }
  }
