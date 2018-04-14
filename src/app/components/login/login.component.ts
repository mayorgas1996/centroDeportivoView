import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Login } from '../../models/login';
import { GLOBAL }  from '../../services/global';
import { LoginService} from '../../services/login.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  providers: [LoginService]
})
export class LoginComponent implements OnInit{

  public login : Login;
  public status: string;
  public error_message: string;
  public title: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _loginService: LoginService
  ){
    this.login = new Login('','','','');
    this.title = 'Gestión Centros Deportivos';
  }

  ngOnInit(){
    console.log('login.component cargado con exito!');
    console.log(this._loginService.getToken());
  }

  onSubmit(){
    this._loginService.login(this.login).subscribe(
      //Usuario se ha logueado correctamente
      data => {

        this.login.token = data.token;
        console.log('Datos: ' + JSON.stringify(data));
        let datos = data.datos;
        datos = datos.slice(1,-1); //Quitamos la llave ({) del principio y del final para despues poder tratarlo como un JSON
        let datosJSON = JSON.parse(datos); //Lo convertimos a JSON

        if(this.login.rol == 'Administrador'){
          localStorage.setItem('id',datosJSON.ID_ADMIN);
        }
        else if(this.login.rol == 'Director'){
          localStorage.setItem('id',datosJSON.ID_DIRECTOR);
        }
        else if(this.login.rol == 'Técnico'){
          localStorage.setItem('id',datosJSON.ID_TECNICO);
        }
        else{
          localStorage.setItem('id',datosJSON.ID_USUARIO);
        }

        console.log('ID guardado: ' + localStorage.getItem('id'));

        //Guardamos en el localStorage el token al haber iniciado sesion para la
        //persistencia de datos
        localStorage.setItem('token',this.login.token);
        localStorage.setItem('nombre',datosJSON.NOMBRE);
        localStorage.setItem('email',datosJSON.EMAIL);
        localStorage.setItem('rol',this.login.rol);

        //Guardamos el token en el objeto Login
        
        this.status= 'success';
        //Ahora redirigimos a la página principal que es home
        this._router.navigate(['/']);
      },
      err => {
        console.log("Error: " + JSON.stringify(err));
        var body = JSON.parse(err._body);
        this.status= 'error';
        this.error_message = body.mensaje;
      }
    );
  }

}
