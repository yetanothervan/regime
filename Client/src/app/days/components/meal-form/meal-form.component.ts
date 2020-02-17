import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dish } from 'src/app/dtos/dish';
import { Meal } from 'src/app/dtos/meal';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable, interval } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import { MealItem } from 'src/app/dtos/meal-item';
import { v4 as uuid } from 'uuid';
import { Ingredient } from 'src/app/dtos/ingredient';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss']
})
export class MealFormComponent {

  private _dishes: Dish[];
  private _meal: Meal;
  private _mealModel: MealModel;
  addNewButtonDisabled: boolean;

  @Input() public get meal(): Meal {
    return this._meal;
  }
  public set meal(value: Meal) {
    this._meal = value;
    this.mealSub.next(this._meal);
  }

  @Input() public get dishes(): Dish[] {
    return this._dishes;
  }
  public set dishes(value: Dish[]) {
    this._dishes = value;
    if (this.meal) { this.mealSub.next(this.meal); }
  }

  @Input() ingredients: Ingredient[];

  @Input() public get mealModel(): MealModel {
    return this._mealModel;
  }
  public set mealModel(value: MealModel) {
    this._mealModel = value;
    if (value) this.dishAltArray$ = this.mealModel.mealItems$.pipe(
      map(items => {
        const array = this.form.get('dishAltArray') as FormArray;
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

  @Output() public changed: EventEmitter<boolean> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  mealSub: Subject<Meal>;
  meal$: Observable<Meal>;

  get dishArray(): FormArray {
    return this.form.get('dishArray') as FormArray;
  }

  dishAltArray$: Observable<FormArray>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      dishArray: this.fb.array([]),
      dishAltArray: this.fb.array([])
    });

    this.mealSub = new Subject<Meal>();
    this.meal$ = this.mealSub.asObservable().pipe(map(d => d));
    this.meal$.subscribe( meal => {
      this.patchForm(meal);
      this.notifyParentAndRecalculate();
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe(() => {
      this.notifyParentAndRecalculate();
    });
  }
 

  notifyParentAndRecalculate() {
    this.changed.emit(true);
    this.recalculateFormChanges(this.meal);
  }

  patchForm(meal: Meal) {
    this.form.patchValue({
    });
    if (!this.dishes || !meal || !meal.mealItems) return;
    const array = this.dishArray;
    array.controls.splice(0);
    meal.mealItems.forEach(i => {
      const dish = this.dishes.find(d => d.id === i.dishId);
      array.push(this.getDishGroup(dish, i.weight));
    });
  }

  addNewDish(): void {
    const mealItem = { dishId: '', id: uuid(), weight: 1 } as MealItem;
    this.meal.mealItems.push(mealItem);
    this.mealSub.next(this.meal);
  }

  getDishGroup(dish: Dish, weight: number): FormGroup {
    return this.fb.group({
      dish,
      weight
    });
  }

  removeDish(n: number): void {
    this.meal.mealItems.splice(n, 1);
    this.mealSub.next(this.meal);
  }

  onDishChanged(i: number, dish: Dish) {
    this.meal.mealItems[i].dishId = dish.id;
    this.notifyParentAndRecalculate();
  }

  onWeightChanged(i: number, weight: number) {
    this.meal.mealItems[i].weight = weight;
    this.notifyParentAndRecalculate();
  }

  recalculateFormChanges(meal: Meal) {
    if (meal && meal.mealItems) {
      this.addNewButtonDisabled = meal.mealItems.some(item => !item.dishId);
    }
  }
}