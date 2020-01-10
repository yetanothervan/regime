import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainShellComponent } from './containers/main-shell.component';
import { MainRoutingModule } from './main-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/main.reducer';

@NgModule({
  declarations: [MainShellComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    StoreModule.forFeature('main', reducer)
  ],
  providers: [],
  bootstrap: []
})
export class MainModule { }
