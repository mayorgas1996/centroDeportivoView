import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ClassComponent} from './components/class/class.component';
import {FinancesComponent} from './components/finances/finances.component';
import {UsersComponent} from './components/users/users.component';
import {RoutinesComponent} from './components/routines/routines.component';
import {BooksComponent} from './components/books/books.component';

const statsRoutes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'clases', pathMatch:'full'},
      {path: 'clases', component: ClassComponent},
      {path: 'finanzas', component: FinancesComponent},
      {path: 'usuarios', component: UsersComponent},
      {path: 'rutinas', component: RoutinesComponent},
      {path: 'reservas', component: BooksComponent}

    ]

  }

];

@NgModule({
  imports: [
    RouterModule.forChild(statsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class StatsRoutingModule implements OnInit{

  ngOnInit(){
    console.log('YA SIRVE!');
  }

}
