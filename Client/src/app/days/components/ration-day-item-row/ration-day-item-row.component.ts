import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';

@Component({
  selector: 'rg-ration-day-item-row',
  templateUrl: './ration-day-item-row.component.html',
  styleUrls: ['./ration-day-item-row.component.scss']
})
export class RationDayItemRowComponent implements OnInit {
  @Input() mealTypes: MealType[];
  @Input() currentMealType: MealType;
  @Output() mealTypeChanged: EventEmitter<MealType> = new EventEmitter();

  compareFn: ((i1: MealType, i2: MealType) => boolean) | null = this.compareByValue;
  compareByValue(i1: MealType, i2: MealType) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  selectionChanged(mealType: MealType) {
    this.mealTypeChanged.emit(mealType);
    this.currentMealType = mealType;
  }

}
