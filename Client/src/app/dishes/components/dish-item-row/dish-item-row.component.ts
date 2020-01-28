import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-dish-item-row',
  templateUrl: './dish-item-row.component.html',
  styleUrls: ['./dish-item-row.component.scss']
})
export class DishItemRowComponent implements OnInit {

  @Input() ingredients: Ingredient[];

  @Input()  get currentIngredient(): Ingredient { return this._currentIngredient; }
  set currentIngredient(value: Ingredient) {
    this._currentIngredient = value;
    this.ingredientChanged.next(this._currentIngredient);
  }

  @Input() get weight(): number { return this._weight; }
  set weight(value: number) {
    this._weight = value;
    this.weightChanged.next(this._weight);
  }

  @Output() weightChanged: EventEmitter<number> = new EventEmitter();
  @Output() ingredientChanged: EventEmitter<Ingredient> = new EventEmitter();
  _weight: number;
  _currentIngredient: Ingredient;

  compareFn: ((i1: Ingredient, i2: Ingredient) => boolean) | null = this.compareByValue;
  compareByValue(i1: Ingredient, i2: Ingredient) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit() {
  }

}
