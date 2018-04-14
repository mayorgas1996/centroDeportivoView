//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {ExercisesRoutingModule} from './exercises-routing.module';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';
import {SearchComponent} from './components/search/search.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ExercisesRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent,
    SearchComponent
  ],
  providers: [ ]

})

export class ExercisesModule { }