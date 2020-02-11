import { Component, OnInit, Input } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';

@Component({
  selector: 'rg-meal-types-list',
  templateUrl: './meal-types-list.component.html',
  styleUrls: ['./meal-types-list.component.scss']
})
export class MealTypesListComponent implements OnInit {

  @Input()  mealTypes: MealType[];

  constructor() { }

  ngOnInit(): void {
  }

}
