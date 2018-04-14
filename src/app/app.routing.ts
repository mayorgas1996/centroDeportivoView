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
      {path: 'pistas', loadChildren: 'app/courts/courts.module#CourtsModule'},
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
      {path: 'director/edit/:id', component: DirectorEditComponent}
    ]
  },
  {path: '**'   , component: HomeComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
