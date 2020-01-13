import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './shell/root.component';
import { ShellComponent } from './shell/shell.component';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    RootComponent, ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      name: 'Regime',
    }),
    EffectsModule.forRoot([])
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
