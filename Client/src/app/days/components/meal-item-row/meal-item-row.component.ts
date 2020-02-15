import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/dtos/dish';
import { DishExt } from 'src/app/models/dish-ext';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-meal-item-row',
  templateUrl: './meal-item-row.component.html',
  styleUrls: ['./meal-item-row.component.scss']
})
export class MealItemRowComponent implements OnInit {
  private _weight: number;
  private _currentDish: Dish;
  public dishExt: DishExt;

  @Input() dishes: Dish[];
  @Input() ingredients: Ingredient[];

  @Input() public get currentDish(): Dish {
    return this._currentDish;
  }
  public set currentDish(value: Dish) {
    if (this._currentDish !== value) {
      this._currentDish = value;
      this.dishExt = new DishExt(value, this.ingredients);
    }
  }

  @Input() get weight(): number { return this._weight; }
  set weight(value: number) {
    if (this._weight !== value) {
      this._weight = value;
      this.dishExt = new DishExt(this.currentDish, this.ingredients);
      this.weightChanged.emit(this._weight);
    }
  }

  @Output() dishChanged: EventEmitter<Dish> = new EventEmitter();
  @Output() weightChanged: EventEmitter<number> = new EventEmitter();

  compareFn: ((i1: Dish, i2: Dish) => boolean) | null = this.compareByValue;
  compareByValue(i1: Dish, i2: Dish) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit(): void {
  }

  selectionChanged(dish: Dish) {
    this.dishChanged.emit(dish);
    this.currentDish = dish;
  }

}
