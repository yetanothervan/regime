import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';

@Component({
  selector: 'rg-meal-types-list',
  templateUrl: './meal-types-list.component.html',
  styleUrls: ['./meal-types-list.component.scss']
})
export class MealTypesListComponent implements OnInit {

  @Input()  mealTypes: MealType[];
  @Output() saved: EventEmitter<MealType> = new EventEmitter<MealType>();

  constructor() { }

  ngOnInit(): void {
  }

  onSaved(mealType: MealType) {
    this.saved.next(mealType);
  }

}
