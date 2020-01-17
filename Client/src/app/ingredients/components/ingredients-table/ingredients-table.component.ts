import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { IngredientsService } from '../../ingredients.service';
import { takeWhile, tap } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { Store, select } from '@ngrx/store';
import * as fromIng from '../../state/ingredients.reducer';
import * as ingActions from '../../state/ingredients.actions';

@Component({
  selector: 'rg-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit, OnDestroy {
  componentIsActive = true;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['caption', 'kkal100', 'protein100', 'fat100', 'carbon100', 'comment'];
  public noData: Ingredient[] = [{} as Ingredient];
  public loading: boolean;
  public error$: Observable<boolean>;

  constructor(private store: Store<fromIng.IngredientsState>, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.store.pipe(
      select(fromIng.getIngredients),
      takeWhile(() => this.componentIsActive))
      .subscribe(res => {
        this.dataSource = new MatTableDataSource(res);
        this.cdr.detectChanges();
      });
    this.store.dispatch(new ingActions.Load());
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
