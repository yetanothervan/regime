import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShellComponent } from './shell/shell.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: 'home', component: ShellComponent,
  children: [
    { path: '', pathMatch: 'full', redirectTo: 'main'},
    { path: 'main',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule) }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
