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
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DaysComposeComponent } from './components/days-compose/days-compose.component';
import { MealItemComponent } from './containers/meal-item/meal-item.component';
import { MealFormComponent } from './components/meal-form/meal-form.component';
import { DaySaverComponent } from './containers/day-saver/day-saver.component';
import { MealItemRowComponent } from './components/meal-item-row/meal-item-row.component';
import { MealNutrientsComponent } from './components/meal-nutrients/meal-nutrients.component';
import { CurrentDayServiceModule } from './service/current-day-service.module';
import { DayNutrientsComponent } from './components/day-nutrients/day-nutrients.component';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DaysInterceptor } from './service/fakeback.interceptor';

@NgModule({
  declarations: [DaysShellComponent,
    DaysProviderComponent,
    DaysListComponent,
    RationDayItemRowComponent,
    RationDayFormComponent,
    DaysItemComponent,
    DaysComposeComponent,
    MealItemRowComponent,
    MealItemComponent,
    MealFormComponent,
    DaySaverComponent,
    MealNutrientsComponent,
    DayNutrientsComponent
  ],
  imports: [
    CommonModule,
    DaysRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    StoreModule.forFeature(me.daysFeatureKey, reducer),
    EffectsModule.forFeature([DaysEffects]),
    DaysServiceModule,
    CurrentDayServiceModule
  ],
  providers: [
    environment.useFakeback ? { provide: HTTP_INTERCEPTORS, useClass: DaysInterceptor, multi: true } : []
  ],
})
export class DaysModule { }