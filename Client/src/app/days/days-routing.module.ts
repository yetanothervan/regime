import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaysShellComponent } from './containers/days-shell/days-shell.component';
import { DaysProviderComponent } from './containers/days-provider/days-provider.component';

const routes: Routes = [
  { path: '', component: DaysShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'all' },
      { path: 'all', component: DaysProviderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaysRoutingModule { }
