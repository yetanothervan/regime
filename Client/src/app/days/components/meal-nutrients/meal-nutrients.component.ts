import { Component, OnInit, Input, OnChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MealModel } from 'src/app/models/meal.model';
import { MealType } from 'src/app/dtos/meal-type';
import { NutrientModel } from 'src/app/models/nutrient.model';
import { takeWhile } from 'rxjs/operators';
import { ModelService } from 'src/app/models/model.static';

@Component({
  selector: 'rg-meal-nutrients',
  templateUrl: './meal-nutrients.component.html',
  styleUrls: ['./meal-nutrients.component.scss']
})
export class MealNutrientsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() model: MealModel;
  @Input() mealType: MealType;

  kkPercent = 0;
  kkClass = '';
  proteinPercent = 0;
  proteinDisplay = 0;
  proteinClass = '';
  fatPercent = 0;
  fatDisplay = 0;
  fatClass = '';
  carbonPercent = 0;
  carbonDisplay = 0;
  carbonClass = '';

  active = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.model && this.mealType) {
      const nutrient = new NutrientModel(this.model, this.mealType);
      nutrient.kkPercent$.pipe(takeWhile(() => this.active))
        .subscribe(v => {
          this.kkPercent = v ? v : 0;
          this.kkClass = ModelService.getClass(ModelService.getPercentageClass(v));
          this.cdr.detectChanges();
        });
      nutrient.proteinPercent$.pipe(takeWhile(() => this.active))
        .subscribe(v => {
          this.proteinPercent = this.getNutrientValue(v, this.mealType.proteinPart);
          this.proteinDisplay = v ? v : 0;
          this.proteinClass = ModelService.getClass(ModelService.getPercentageClass(this.proteinPercent));
          this.cdr.detectChanges();});
      nutrient.fatPercent$.pipe(takeWhile(() => this.active))
        .subscribe(v => {
          this.fatPercent = this.getNutrientValue(v, this.mealType.fatPart);
          this.fatDisplay = v ? v : 0;
          this.fatClass = ModelService.getClass(ModelService.getPercentageClass(this.fatPercent));
          this.cdr.detectChanges();});
      nutrient.carbonPercent$.pipe(takeWhile(() => this.active))
        .subscribe(v => {
          this.carbonPercent = this.getNutrientValue(v, this.mealType.carbonPart);
          this.carbonDisplay = v ? v : 0;
          this.carbonClass = ModelService.getClass(ModelService.getPercentageClass(this.carbonPercent));
          this.cdr.detectChanges();});
    }
  }

  getNutrientValue(n: number, part: number) {
    if (!n || !part) return 0;
    return this.round(n / part);
  }

  private round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100);
  }

  ngOnDestroy() {
    this.active = false;
  }
}
