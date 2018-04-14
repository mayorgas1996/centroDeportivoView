import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';
import {SearchComponent} from './components/search/search.component';

const courtsRoutes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'listado', pathMatch:'full'},
      {path: 'listado', component: ListComponent},
      {path: 'crear', component: AddComponent},
      {path: 'buscar', component: SearchComponent}

    ]

  }

];

@NgModule({
  imports: [
    RouterModule.forChild(courtsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class CourtsRoutingModule implements OnInit{

  ngOnInit(){
    console.log('YA SIRVE!');
  }

}
