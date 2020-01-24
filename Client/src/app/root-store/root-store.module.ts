import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './root-store.reducer';
import { EntitiesService } from './entities.server';
import { EffectsModule } from '@ngrx/effects';
import { RootStoreEffects } from './root-store.effects';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature('root', reducer),
    EffectsModule.forFeature([RootStoreEffects])
  ],
  providers: [EntitiesService],
  bootstrap: []
})
export class RootStoreModule { }
