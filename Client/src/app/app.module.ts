import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { AppRoutingModule } from './app-routing.module';
import { RootComponent } from './shell/root.component';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    RootComponent, ShellComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
