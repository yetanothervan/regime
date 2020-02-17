import { Component, Input } from '@angular/core';
import { Dish } from 'src/app/dtos/dish';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent {

  private _mealModel: MealModel;

  @Input() dishes: Dish[];

  @Input() ingredients: Ingredient[];

  @Input() public get mealModel(): MealModel {
    return this._mealModel;
  }
  public set mealModel(value: MealModel) {
    this._mealModel = value;
    if (this._mealModel?.mealItems$) this.dishArray$ = this.mealModel.mealItems$.pipe(
      map(items => {
        const array = this.form.get('dishArray') as FormArray;
        array.controls.splice(0);
        items.forEach(i => {
          const dish$ = i.dishId$.pipe(map(dishId => this.dishes.find(d => d.id === dishId)));
          array.push(this.fb.group({
            model: i,
            dish$,
            weight$: i.weight$
          }))
        });
        return array;
      })
    );
  }

  form: FormGroup;
  errorMessages = ''; // TODO

  dishArray$: Observable<FormArray>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      dishArray: this.fb.array([])
    });
  }

  addNewDish(): void {
    this.mealModel.addMeal();
  }

  removeDish(n: number): void {
    this.mealModel.removeMeal(n);
  }

}