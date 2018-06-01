import {NgModule, OnInit} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Componentes
import {MainComponent} from './components/main/main.component';
import {ListComponent} from './components/list/list.component';
import {AddComponent} from './components/add/add.component';

const directorsRoutes: Routes = [

  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', redirectTo: 'listado', pathMatch:'full'},
      {path: 'listado', component: ListComponent},
      {path: 'crear', component: AddComponent}

    ]

  }

];

@NgModule({
  imports: [
    RouterModule.forChild(directorsRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class DirectorsRoutingModule implements OnInit{

  ngOnInit(){
    console.log('YA SIRVE!');
  }

}
