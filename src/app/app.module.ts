import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

//Pipe para la búsqueda en el menu de edición de una rutina
import {RoutineSearchPipe} from './RoutinePipe/search.pipe';

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
import { StaffDetailComponent } from './components/staff-detail/staff-detail.component';
import { StaffEditComponent } from './components/staff-edit/staff-edit.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { ExerciseDetailComponent } from './components/exercise-detail/exercise-detail.component';
import { ExerciseEditComponent } from './components/exercise-edit/exercise-edit.component';
import { CourtDetailComponent } from './components/court-detail/court-detail.component';
import { CourtEditComponent } from './components/court-edit/court-edit.component';
import { PlanEditComponent } from './components/plan-edit/plan-edit.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { RoomEditComponent } from './components/room-edit/room-edit.component';
import { RoutineDetailComponent } from './components/routine-detail/routine-detail.component';
import { RoutineEditComponent } from './components/routine-edit/routine-edit.component';

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
    FinanceEditComponent,
    StaffDetailComponent,
    StaffEditComponent,
    UserDetailComponent,
    UserEditComponent,
    ExerciseDetailComponent,
    ExerciseEditComponent,
    CourtDetailComponent,
    CourtEditComponent,
    PlanEditComponent,
    ActivityDetailComponent,
    ActivityEditComponent,
    RoomEditComponent,
    RoutineDetailComponent,
    RoutineEditComponent,
    RoutineSearchPipe
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
