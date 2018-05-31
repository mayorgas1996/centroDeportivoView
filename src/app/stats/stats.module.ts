//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {StatsRoutingModule} from './stats-routing.module';
import { ChartsModule } from 'ng2-charts';


//Componentes
import {MainComponent} from './components/main/main.component';
import {ClassComponent} from './components/class/class.component';
import {FinancesComponent} from './components/finances/finances.component';
import {UsersComponent} from './components/users/users.component';
import {RoutinesComponent} from './components/routines/routines.component';
import {BooksComponent} from './components/books/books.component';

@NgModule({
  declarations: [
    MainComponent,
    ClassComponent,
    FinancesComponent,
    UsersComponent,
    RoutinesComponent,
    BooksComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    StatsRoutingModule,
    ChartsModule
  ],
  exports:[
    MainComponent,
    ClassComponent,
    FinancesComponent,
    UsersComponent,
    RoutinesComponent,
    BooksComponent
  ],
  providers: [ ]

})

export class StatsModule { }
