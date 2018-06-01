//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AdminRoutingModule} from './admin-routing.module';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';

//Pipe para la búsqueda
import {SearchPipe} from './pipes/search.pipe';

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
    AdminRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent,
  ],
  providers: [ ]

})

export class AdminModule { }
