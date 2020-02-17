import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';
import { MealExt } from 'src/app/models/meal-ext';
import { DayModel } from 'src/app/models/day.model';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-ration-day-item-row',
  templateUrl: './ration-day-item-row.component.html',
  styleUrls: ['./ration-day-item-row.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RationDayItemRowComponent implements OnInit, OnChanges {

  private _model: MealModel;
  @Input() mealTypes: MealType[];
  @Input() currentMealTypeId: string;
  @Input() public get model(): MealModel {
    return this._model;
  }
  public set model(value: MealModel) {
    this._model = value;
  }
  @Output() mealTypeChanged: EventEmitter<MealType> = new EventEmitter();
  currentMealType: MealType;

  compareFn: ((i1: MealType, i2: MealType) => boolean) | null = this.compareByValue;
  compareByValue(i1: MealType, i2: MealType) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.currentMealTypeId && this.mealTypes) {
      this.currentMealType = this.mealTypes.find(m => m.id = this.currentMealTypeId);
    }
  }

  selectionChanged(mealType: MealType) {
    this.mealTypeChanged.emit(mealType);
  }

}
