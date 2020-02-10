import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './shell/root.component';
import { ShellComponent } from './shell/shell.component';
import { EffectsModule } from '@ngrx/effects';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { RootStoreModule } from './root-store/root-store.module';
import { FakebackServiceModule } from './fakeback/fakeback.service-module';

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
    EffectsModule.forRoot([]),
    NoopAnimationsModule,
    NgbCollapseModule,
    FakebackServiceModule,
    SharedModule.forRoot(),
    RootStoreModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
