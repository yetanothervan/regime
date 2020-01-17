import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { IngredientsService } from '../../ingredients.service';
import { takeWhile } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent implements OnInit, OnDestroy {
  componentIsActive = true;
  dataSource = new MatTableDataSource();
  displayedColumns: string[] = ['caption', 'kkal100', 'protein100', 'fat100', 'carbon100', 'comment'];

  constructor(private ingredientsService: IngredientsService) { }

  ngOnInit() {
    this.ingredientsService.getIngredients().pipe(
      takeWhile((tt: Ingredient[]) => this.componentIsActive)).subscribe(res => {
        this.dataSource.data = res;
      });
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
