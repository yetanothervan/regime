import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportShellComponent } from './containers/report-shell/report-shell.component';
import { ReportProviderComponent } from './containers/report-provider/report-provider.component';
import { ReportIngredientsListComponent } from './components/report-ingredients-list/report-ingredients-list.component';


@NgModule({
  declarations: [ReportShellComponent, ReportProviderComponent, ReportIngredientsListComponent],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
