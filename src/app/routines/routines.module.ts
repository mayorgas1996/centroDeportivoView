//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RoutinesRoutingModule} from './routines-routing.module';

import {RoutineSearchPipe} from './pipes/search.pipe';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    RoutineSearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RoutinesRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent,
  ],
  providers: [ ]

})

export class RoutinesModule { }
