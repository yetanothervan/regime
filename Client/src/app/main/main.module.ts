import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainShellComponent } from './containers/main-shell/main-shell.component';
import { MainRoutingModule } from './main-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './state/main.effects';
import { DaysService } from './days.service';
import { DayManagerComponent } from './containers/day-manager/day-manager.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [MainShellComponent, DayManagerComponent],
  imports: [
    SharedModule,
    MainRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('main', reducer),
    EffectsModule.forFeature([MainEffects])
  ],
  providers: [DaysService],
  bootstrap: []
})
export class MainModule { }
