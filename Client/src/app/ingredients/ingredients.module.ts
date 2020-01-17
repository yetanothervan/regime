import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IngredientsShellComponent } from './containers/ingredients-shell.component';
import { IngredientsRoutingModule } from './ingredients-routing.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/ingredients.reducer';
import { IngredientsTableComponent } from './components/ingredients-table/ingredients-table.component';
import { IngredientsService } from './ingredients.service';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';


@NgModule({
  declarations: [IngredientsShellComponent, IngredientsTableComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    IngredientsRoutingModule,
    StoreModule.forFeature('ingredients', reducer),
    MatTableModule,
    MatInputModule,
    MatSortModule
  ],
  providers: [IngredientsService],
  bootstrap: []
})
export class IngredientsModule { }
