import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DaysRoutingModule } from './days-routing.module';
import { DaysShellComponent } from './containers/days-shell/days-shell.component';
import { DaysProviderComponent } from './containers/days-provider/days-provider.component';
import { DaysListComponent } from './components/days-list/days-list.component';
import { StoreModule } from '@ngrx/store';
import * as me from './state';
import { DaysEffects } from './state/days.effects';
import { EffectsModule } from '@ngrx/effects';
import { DaysServiceModule } from './service/days-service.module';
import { reducer } from './state/days.reducer';
import { RationDayItemRowComponent } from './components/ration-day-item-row/ration-day-item-row.component';
import { RationDayFormComponent } from './components/ration-day-form/ration-day-form.component';
import { DaysItemComponent } from './containers/days-item/days-item.component';


@NgModule({
  declarations: [DaysShellComponent, DaysProviderComponent, DaysListComponent, RationDayItemRowComponent, RationDayFormComponent, DaysItemComponent],
  imports: [
    CommonModule,
    DaysRoutingModule,
    StoreModule.forFeature(me.daysFeatureKey, reducer),
    EffectsModule.forFeature([DaysEffects]),
    DaysServiceModule
  ]
})
export class DaysModule { }