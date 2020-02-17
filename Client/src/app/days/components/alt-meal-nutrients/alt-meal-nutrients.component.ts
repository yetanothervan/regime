import { Component, OnInit, Input } from '@angular/core';
import { MealExt } from 'src/app/models/meal-ext';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-alt-meal-nutrients',
  templateUrl: './alt-meal-nutrients.component.html',
  styleUrls: ['./alt-meal-nutrients.component.scss']
})
export class AltMealNutrientsComponent implements OnInit {
  private _model: MealModel;
  @Input() mealExt: MealExt;
  @Input()
  public get model(): MealModel {
    return this._model;
  }
  public set model(value: MealModel) {
    this._model = value;
  }

  constructor() { }

  ngOnInit(): void {
  }

  round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

}
