import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-meal-item-row',
  templateUrl: './meal-item-row.component.html',
  styleUrls: ['./meal-item-row.component.scss']
})
export class MealItemRowComponent implements OnInit {
  @Input() dishes: Dish[];
  @Input() currentDish: Dish;
  @Output() dishChanged: EventEmitter<Dish> = new EventEmitter();

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
