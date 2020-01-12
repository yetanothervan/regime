import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './containers/main-shell/main-shell.component';
import { MainRoutingModule } from './main-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/main.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MainEffects } from './state/main.effects';
import { DaysService } from './days.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [MainShellComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    HttpClientModule,
    StoreModule.forFeature('main', reducer),
    EffectsModule.forFeature([MainEffects])
  ],
  providers: [DaysService],
  bootstrap: []
})
export class MainModule { }
