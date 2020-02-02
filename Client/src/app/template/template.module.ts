import { NgModule } from '@angular/core';
import { TemplatePfixShellComponent } from './containers/template-shell/template-shell.component';
import { TemplatePfixRoutingModule } from './template-routing.module';
import { StoreModule } from '@ngrx/store';
import { TemplatePfixTableComponent } from './components/template-table/template-table.component';
import { TemplatePfixService } from './template.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { EffectsModule } from '@ngrx/effects';
import { TemplatePfixEffects } from './state/template.effects';
import { TemplatePfixProviderComponent } from './containers/template-provider/template-provider.component';
import { TemplatePfixItemComponent } from './containers/template-item/template-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { TemplatePfixFormComponent } from './components/template-form/template-form.component';
import * as myState from './state';
import * as myReducer from './state/template.reducer';

@NgModule({
  declarations: [TemplatePfixShellComponent,
    TemplatePfixProviderComponent,
    TemplatePfixTableComponent,
    TemplatePfixItemComponent,
    TemplatePfixFormComponent],
  imports: [
    SharedModule,
    TemplatePfixRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    StoreModule.forFeature(myState.templatePfixFeatureKey, myReducer.reducer),
    EffectsModule.forFeature([TemplatePfixEffects])
  ],
  providers: [TemplatePfixService],
  bootstrap: []
})
export class TemplatePfixModule { }
