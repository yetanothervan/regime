import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './root-store.reducer';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    StoreModule.forFeature('root', reducer)
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }
