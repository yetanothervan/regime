import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './root-store.reducer';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreEffects } from './root-store.effects';
import { EntitiesServiceModule } from './service/entities.service-module';
import { environment } from 'src/environments/environment';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EntitiesInterceptor } from './service/fakeback.interceptor';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature('root', reducer),
    EffectsModule.forFeature([RootStoreEffects]),
    EntitiesServiceModule
  ],
  providers: [
    environment.useFakeback ? { provide: HTTP_INTERCEPTORS, useClass: EntitiesInterceptor, multi: true } : []
  ],
  bootstrap: []
})
export class RootStoreModule { }
