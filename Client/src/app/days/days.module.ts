import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaysRoutingModule } from './days-routing.module';
import { DaysShellComponent } from './containers/days-shell/days-shell.component';
import { DaysProviderComponent } from './containers/days-provider/days-provider.component';
import { DaysListComponent } from './components/days-list/days-list.component';


@NgModule({
  declarations: [DaysShellComponent, DaysProviderComponent, DaysListComponent],
  imports: [
    CommonModule,
    DaysRoutingModule
  ]
})
export class DaysModule { }
