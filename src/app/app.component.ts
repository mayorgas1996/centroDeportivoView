import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [LoginService]
})
export class AppComponent implements OnInit{
  public title:string;
  public token:string;

  constructor(
    private _loginService: LoginService
  ){
    this.title = 'Gestion Centros Deportivos';
  }

  ngOnInit(){
    this.token = this._loginService.getToken();
  }
}
