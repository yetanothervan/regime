import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportShellComponent } from './containers/report-shell/report-shell.component';
import { ReportProviderComponent } from './containers/report-provider/report-provider.component';


const routes: Routes = [
  {
    path: '', component: ReportShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'summary'},
      { path: 'summary', component: ReportProviderComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
