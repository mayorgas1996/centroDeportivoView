//Módulos
import {NgModule} from '@angular/core';
import {CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {CourtsRoutingModule} from './courts-routing.module';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';

@NgModule({
  declarations: [
    MainComponent,
    ListComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    CourtsRoutingModule
  ],
  exports:[
    MainComponent,
    ListComponent,
    AddComponent
  ],
  providers: [ ]

})

export class CourtsModule { }
