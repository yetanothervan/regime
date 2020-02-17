import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MealModel } from 'src/app/models/meal.model';
import { MealType } from 'src/app/dtos/meal-type';
import { NutrientModel } from 'src/app/models/nutrient.model';

@Component({
  selector: 'rg-alt-meal-nutrients',
  templateUrl: './alt-meal-nutrients.component.html',
  styleUrls: ['./alt-meal-nutrients.component.scss']
})
export class AltMealNutrientsComponent implements OnInit, OnChanges {

  @Input() model: MealModel;
  @Input() mealType: MealType;
  nutrient: NutrientModel;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    if (this.model && this.mealType) {
      this.nutrient = new NutrientModel(this.model, this.mealType);
    }
  }

  round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

}
