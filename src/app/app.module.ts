import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

//Imports de nuevos modulos

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MyProfileComponent } from './components/my_profile/my_profile.component';
import { AdminDetailComponent } from './components/admin-detail/admin-detail.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { CenterDetailComponent } from './components/center-detail/center-detail.component';
import { CenterEditComponent } from './components/center-edit/center-edit.component';
import { DirectorDetailComponent } from './components/director-detail/director-detail.component';
import { DirectorEditComponent } from './components/director-edit/director-edit.component';
import { FinanceEditComponent } from './components/finance-edit/finance-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MyProfileComponent,
    AdminDetailComponent,
    AdminEditComponent,
    CenterDetailComponent,
    CenterEditComponent,
    DirectorDetailComponent,
    DirectorEditComponent,
    FinanceEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
