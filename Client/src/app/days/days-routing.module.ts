import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysShellComponent } from './containers/days-shell/days-shell.component';
import { DaysComposeComponent } from './components/days-compose/days-compose.component';

const routes: Routes = [
  { path: '', component: DaysShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: DaysComposeComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaysRoutingModule { }
