import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule, LoadChildren } from '@angular/router';

//Componentes
import { LoginComponent } from './components/login/login.component';
import { HomeComponent  } from './components/home/home.component';
import { MyProfileComponent  } from './components/my_profile/my_profile.component';
import { AdminDetailComponent  } from './components/admin-detail/admin-detail.component';
import { AdminEditComponent  } from './components/admin-edit/admin-edit.component';
import { CenterDetailComponent  } from './components/center-detail/center-detail.component';
import { CenterEditComponent  } from './components/center-edit/center-edit.component';
import { DirectorDetailComponent  } from './components/director-detail/director-detail.component';
import { DirectorEditComponent  } from './components/director-edit/director-edit.component';
import { FinanceEditComponent  } from './components/finance-edit/finance-edit.component';
import { StaffDetailComponent  } from './components/staff-detail/staff-detail.component';
import { StaffEditComponent  } from './components/staff-edit/staff-edit.component';
import { UserDetailComponent  } from './components/user-detail/user-detail.component';
import { UserEditComponent  } from './components/user-edit/user-edit.component';
import { ExerciseDetailComponent  } from './components/exercise-detail/exercise-detail.component';
import { ExerciseEditComponent  } from './components/exercise-edit/exercise-edit.component';
import { CourtDetailComponent  } from './components/court-detail/court-detail.component';
import { CourtEditComponent  } from './components/court-edit/court-edit.component';
import { PlanEditComponent  } from './components/plan-edit/plan-edit.component';
import { ActivityDetailComponent } from './components/activity-detail/activity-detail.component';
import { ActivityEditComponent } from './components/activity-edit/activity-edit.component';
import { RoomEditComponent } from './components/room-edit/room-edit.component';
import { RoutineDetailComponent } from './components/routine-detail/routine-detail.component';
import { RoutineEditComponent } from './components/routine-edit/routine-edit.component';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { NewAnalysisComponent } from './components/new-analysis/new-analysis.component';

//Pipes
import {RoutineSearchPipe} from './routines/pipes/search.pipe';


//Routes
export const appRoutes: Routes = [
  {path: '', redirectTo:'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home' , component: HomeComponent,
    children:[
      {path: 'my_profile', component: MyProfileComponent},
      {path: 'administracion', loadChildren: 'app/admin/admin.module#AdminModule'},
      {path: 'centros', loadChildren: 'app/centers/centers.module#CentersModule'},
      {path: 'direccion', loadChildren: 'app/directors/directors.module#DirectorsModule'},
      {path: 'contabilidad', loadChildren: 'app/finances/finances.module#FinancesModule'},
      {path: 'personal', loadChildren: 'app/staff/staff.module#StaffModule'},
      {path: 'actividades', loadChildren: 'app/activities/activities.module#ActivitiesModule'},
      {path: 'horario', loadChildren: 'app/schedule/schedule.module#ScheduleModule'},
      {path: 'pistas', loadChildren: 'app/courts/courts.module#CourtsModule'},
      {path: 'estadisticas', loadChildren: 'app/stats/stats.module#StatsModule'},
      {path: 'salas', loadChildren: 'app/rooms/rooms.module#RoomsModule'},
      {path: 'planes', loadChildren: 'app/plans/plans.module#PlansModule'},
      {path: 'usuarios', loadChildren: 'app/users/users.module#UsersModule'},
      {path: 'rutinas', loadChildren: 'app/routines/routines.module#RoutinesModule'},
      {path: 'ejercicios', loadChildren: 'app/exercises/exercises.module#ExercisesModule'},
      {path: 'admin/:id', component: AdminDetailComponent},
      {path: 'admin/edit/:id', component: AdminEditComponent},
      {path: 'centro/:id', component: CenterDetailComponent},
      {path: 'centro/edit/:id', component: CenterEditComponent},
      {path: 'director/:id', component: DirectorDetailComponent},
      {path: 'director/edit/:id', component: DirectorEditComponent},
      {path: 'operacion/edit/:id', component: FinanceEditComponent},
      {path: 'staff/:id', component: StaffDetailComponent},
      {path: 'staff/edit/:id', component: StaffEditComponent},
      {path: 'user/:id', component: UserDetailComponent},
      {path: 'user/edit/:id', component: UserEditComponent},
      {path: 'exercise/:id', component: ExerciseDetailComponent},
      {path: 'exercise/edit/:id', component: ExerciseEditComponent},
      {path: 'pista/:id', component: CourtDetailComponent},
      {path: 'pista/edit/:id', component: CourtEditComponent},
      {path: 'plan/edit/:id', component: PlanEditComponent},
      {path: 'activity/:id', component: ActivityDetailComponent},
      {path: 'activity/edit/:id', component: ActivityEditComponent},
      {path: 'room/edit/:id', component: RoomEditComponent},
      {path: 'routine/:id', component: RoutineDetailComponent},
      {path: 'routine/edit/:id', component: RoutineEditComponent},
      {path: 'user/status/:id', component: UserStatusComponent},
      {path: 'analysis/create/:id', component: NewAnalysisComponent},
    ]
  },
  {path: '**'   , component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
