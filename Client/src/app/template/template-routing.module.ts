import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplatePfixShellComponent } from './containers/template-shell/template-shell.component';
import { TemplatePfixItemComponent } from './containers/template-item/template-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TemplatePfixProviderComponent } from './containers/template-provider/template-provider.component';
import { TemplatePfixPathSaveGuard } from './state/template-path-save.guard';

const routes: Routes = [
  { path: '', component: TemplatePfixShellComponent,
    children: [
      { path: '', canActivate: [TemplatePfixPathSaveGuard] },
      { path: 'all', component: TemplatePfixProviderComponent },
      { path: 'edit', component: TemplatePfixItemComponent }
    ]
  }
];

@NgModule({
  imports: [
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplatePfixRoutingModule { }
