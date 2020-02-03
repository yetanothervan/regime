import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-dish-item-row',
  templateUrl: './dish-item-row.component.html',
  styleUrls: ['./dish-item-row.component.scss']
})
export class DishItemRowComponent implements OnInit {

  @Input() ingredients: Ingredient[];

  @Input() currentIngredient: Ingredient;

  @Input() get weight(): number { return this._weight; }
  set weight(value: number) {
    this._weight = value;
    this.weightChanged.next(this._weight);
  }

  @Output() weightChanged: EventEmitter<number> = new EventEmitter();
  @Output() ingredientChanged: EventEmitter<Ingredient> = new EventEmitter();
  _weight: number;

  compareFn: ((i1: Ingredient, i2: Ingredient) => boolean) | null = this.compareByValue;
  compareByValue(i1: Ingredient, i2: Ingredient) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit() {
  }

  selectionChanged(ingredient: Ingredient) {
    this.ingredientChanged.emit(ingredient);
    this.currentIngredient = ingredient;
  }

}
