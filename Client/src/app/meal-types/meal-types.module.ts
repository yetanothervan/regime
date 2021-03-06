import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MealTypesRoutingModule } from './meal-types-routing.module';
import { MealTypesShellComponent } from './containers/meal-types-shell/meal-types-shell.component';
import { MealTypesProviderComponent } from './containers/meal-types-provider/meal-types-provider.component';
import { MealTypesListComponent } from './components/meal-types-list/meal-types-list.component';
import { MealTypesItemRowComponent } from './components/meal-types-item-row/meal-types-item-row.component';
import { StoreModule } from '@ngrx/store';
import * as me from './state';
import { EffectsModule } from '@ngrx/effects';
import { MealTypesEffects } from './state/meal-types.effects';
import { MealTypesServiceModule } from './service/meal-types-service.module';
import { reducer } from './state/meal-types.reducer';
import { MealTypesInterceptor } from './service/fakeback.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [MealTypesShellComponent,
     MealTypesProviderComponent,
     MealTypesListComponent,
     MealTypesItemRowComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MealTypesRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(me.mealTypesFeatureKey, reducer),
    EffectsModule.forFeature([MealTypesEffects]),
    MealTypesServiceModule
  ],
  providers: [
    environment.useFakeback ? { provide: HTTP_INTERCEPTORS, useClass: MealTypesInterceptor, multi: true } : []
  ]
})
export class MealTypesModule { }
