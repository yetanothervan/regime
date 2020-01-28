import { Component, OnInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-dish-item-row',
  templateUrl: './dish-item-row.component.html',
  styleUrls: ['./dish-item-row.component.scss']
})
export class DishItemRowComponent implements OnInit {
  @Input() ingredients: Ingredient[];
  @Input() currentIngredient: Ingredient;
  @Input() weight: number;

  compareFn: ((i1: Ingredient, i2: Ingredient) => boolean) | null = this.compareByValue;
  compareByValue(i1: Ingredient, i2: Ingredient) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor() { }

  ngOnInit() {
  }

}
