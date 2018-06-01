//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {DirectorsRoutingModule} from './directors-routing.module';

//Pipe para la búsqueda
import {SearchPipe} from './pipes/search.pipe';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    DirectorsRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent,
  ],
  providers: [ ]

})

export class DirectorsModule { }
