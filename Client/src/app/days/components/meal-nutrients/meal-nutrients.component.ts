import { Component, OnInit, Input } from '@angular/core';
import { MealExt } from 'src/app/models/meal-ext';

@Component({
  selector: 'rg-meal-nutrients',
  templateUrl: './meal-nutrients.component.html',
  styleUrls: ['./meal-nutrients.component.scss']
})
export class MealNutrientsComponent implements OnInit {
  @Input() mealExt: MealExt;

  constructor() { }

  ngOnInit(): void {
  }

  round(n: number): number {
    return Math.round((n + Number.EPSILON) * 100) / 100;
  }

}
