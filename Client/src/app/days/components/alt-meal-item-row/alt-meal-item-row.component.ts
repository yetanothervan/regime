import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Dish } from 'src/app/dtos/dish';
import { MealItemModel } from 'src/app/models/meal-item.model';

@Component({
  selector: 'rg-alt-meal-item-row',
  templateUrl: './alt-meal-item-row.component.html',
  styleUrls: ['./alt-meal-item-row.component.scss']
})
export class AltMealItemRowComponent implements OnInit, OnChanges {
  private _weight: number;

  @Input() dishes: Dish[];
  @Input() model: MealItemModel;
  currentDish: Dish;

  public get weight(): number {
    return this._weight;
  }
  public set weight(value: number) {
    this._weight = value;
    if (this.model) this.model.weight$.next(value);
  }

  compareFn: ((i1: Dish, i2: Dish) => boolean) | null = this.compareByValue;
  compareByValue(i1: Dish, i2: Dish) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.model && this.dishes) {
      this.currentDish = this.dishes.find(d => d.id === this.model.dishId$.value);
      this.weight = this.model.weight$.value;
    }
  }

  selectionChanged(dish: Dish) {
    this.model.dishId$.next(dish.id);
  }

}
