import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HomeService  } from '../../services/home.service';
import { My_Profile } from '../../models/my_profile';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  providers: [HomeService]
})

export class HomeComponent implements OnInit{

  public title : string;
  public rol   : string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService,
    private _homeService: HomeService
  ){
      this.title = 'Home';
      this.rol   = _loginService.getRol();
  }
  ngOnInit(){
    console.log('home.component cargado con exito!');
    console.log('Rol de actor: ' + this._loginService.getRol())
  }

  logout(){
    localStorage.clear();
    this._router.navigate(['/login']);
  }

}
