import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute,  Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { Analysis  } from '../../models/analysis';
import { User  } from '../../models/user';
import { AnalysisService  } from '../../services/analysis.service';
import { UserService  } from '../../services/user.service';
import { LoginService  } from '../../services/login.service'; //Para obtener el token

@Component({
  selector: 'new-analysis',
  templateUrl: './new-analysis.component.html',
  providers: [AnalysisService, LoginService, UserService]

})
export class NewAnalysisComponent implements OnInit {
  public title:string;
  public analysis: Analysis;
  public user: User;
  public token: string;
  public url: string;
  public status:string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _analysisService: AnalysisService,
    private _loginService: LoginService,
    private _userService: UserService
  ){
    this.title = 'Listar';
    this.url = GLOBAL.url;
    this.analysis = new Analysis('','','','','','','','','','','');
    this.user = new User('','','','','','','','','','','','','',false,'','','');
    this.token = this._loginService.getToken();
  }

  ngOnInit(){
    console.log('analysis-edit component cargado ... ');
    this.getUser();

  }

  getUser(){
    this._route.params.forEach((params: Params) =>{
        let id = params['id'];
        this._userService.getUser(this.token,id).subscribe(
          data =>{
            if(!data[0]){ //Aquí entra cuando se quiere acceder al ID de un user que no existe
              this._router.navigate(['/home']); //Redirección al home
            }

            this.user = data[0];
            console.log(this.user);
          },
          err =>{
            this._router.navigate(['/home']);
            console.log(<any>err);
          }
        )
    });
  }

  onSubmit(){
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()

    this.analysis.FECHA = year+'/'+month+'/'+day;

    this._analysisService.addAnalysis(this.token,this.analysis,this.user.ID_USUARIO).subscribe(

      data =>{
        this.status= 'success';
        this.analysis = new Analysis('','','','','','','','','','','');
      },
      err =>{
        this.status = 'error';
      }

    )

  }

}
