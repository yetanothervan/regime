import { Component, OnInit, Input, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MealModel } from 'src/app/models/meal.model';
import { MealType } from 'src/app/dtos/meal-type';
import { NutrientModel } from 'src/app/models/nutrient.model';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'rg-alt-meal-nutrients',
  templateUrl: './alt-meal-nutrients.component.html',
  styleUrls: ['./alt-meal-nutrients.component.scss']
})
export class AltMealNutrientsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() model: MealModel;
  @Input() mealType: MealType;

  kkPercent = 0;
  proteinPercent = 0;
  fatPercent = 0;
  carbonPercent = 0;

  active = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.model && this.mealType) {
      const nutrient = new NutrientModel(this.model, this.mealType);
      nutrient.kkPercent$.pipe(takeWhile(() => this.active)).subscribe(v => {this.kkPercent = v ? v : 0; this.cdr.detectChanges();});
      nutrient.proteinPercent$.pipe(takeWhile(() => this.active)).subscribe(v => {this.proteinPercent = v ? v : 0; this.cdr.detectChanges();});
      nutrient.fatPercent$.pipe(takeWhile(() => this.active)).subscribe(v => {this.fatPercent = v ? v : 0; this.cdr.detectChanges();});
      nutrient.carbonPercent$.pipe(takeWhile(() => this.active)).subscribe(v => {this.carbonPercent = v ? v : 0; this.cdr.detectChanges();});
    }
  }

  ngOnDestroy() {
    this.active = false;
  }
}
