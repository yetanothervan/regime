import {
  Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { map, debounce } from 'rxjs/operators';
import { Ingredient } from 'src/app/dtos/ingredient';
import { Dish } from 'src/app/dtos/dish';
import { DishItem } from 'src/app/dtos/dish-item';
import { DishExt, makeDishExt } from 'src/app/models/dish-ext';
import { Subject, Observable, interval } from 'rxjs';
import { copyDish, isDishEqual } from 'src/app/dtos';

@Component({
  selector: 'rg-dish-form',
  templateUrl: './dish-form.component.html'
})
export class DishFormComponent implements OnInit {
  private _dishOriginal: Dish;
  private _dishMutable: Dish;
  private _ingredients: Ingredient[];

  @Input() public get dishMutable(): Dish {
    return this._dishMutable;
  }
  public set dishMutable(value: Dish) {
    if (!this._dishMutable && value // if set for the first time
      || value && this._dishMutable && value.id !== this._dishMutable.id) { // or id != this.id
      this._dishMutable = value;
      this._dishOriginal = copyDish(value);
      this.dishSub.next(this._dishMutable);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  @Input() public get ingredients(): Ingredient[] {
    return this._ingredients;
  }
  public set ingredients(value: Ingredient[]) {
    this._ingredients = value;
    if (this.dishMutable) { this.dishSub.next(this.dishMutable); }
  }

  @Input() deleteStatus: string;

  @Output() saved: EventEmitter<Dish> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  @ViewChild('caption', { static: true }) captionInputRef: ElementRef;
  form: FormGroup;
  errorMessages = ''; // TODO

  dishSub: Subject<Dish>;
  dishExt$: Observable<DishExt>;

  totalKkal = 0;
  totalProtein = 0;
  totalFat = 0;
  totalCarbon = 0;
  addNewButtonDisabled = false;

  get ingredientArray(): FormArray {
    return this.form.get('ingredientArray') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      ingredientArray: this.fb.array([]),
      comment: '',
      category: ''
    });

    this.dishSub = new Subject<Dish>();
    this.dishExt$ = this.dishSub.asObservable().pipe(map(d => makeDishExt(d, this.ingredients)));
    this.dishExt$.subscribe( dish => {
      this.patchForm(dish);
      this.addNewButtonDisabled = dish.itemsExt.some(item => !item.ingredient);
      this.recalculateFormChanges(dish);
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe((value) => {
      this.dishMutable.caption = value.caption;
      this.dishMutable.category = value.category;
      this.dishMutable.comment = value.comment;
      this.recalculateFormChanges(makeDishExt(this.dishMutable, this.ingredients));
    });
  }

  ngOnInit() {
    this.captionInputRef.nativeElement.focus();
  }

  patchForm(dishExt: DishExt) {
    this.form.patchValue({
      caption: dishExt.caption,
      category: dishExt.category,
      comment: dishExt.comment
    });
    const array = this.ingredientArray;
    array.controls.splice(0);
    dishExt.itemsExt.forEach(i => {
      array.push(this.getIngredientGroup(i.ingredient, i.weight));
    });
  }

  addNewIngredient(): void {
    const dishItem = { ingredientId: '', weight: 0 } as DishItem;
    this.dishMutable.items.push(dishItem);
    this.dishSub.next(this.dishMutable);
  }

  getIngredientGroup(ingredient: Ingredient, weight: number): FormGroup {
    return this.fb.group({
      ingredient: [ingredient],
      weight: [weight]
    });
  }

  removeIngredient(n: number): void {
    this.dishMutable.items.splice(n, 1);
    this.dishSub.next(this.dishMutable);
  }

  ingredientChanged(i: number, ingredient: Ingredient) {
    this.dishMutable.items[i].ingredientId = ingredient.id;
    this.dishSub.next(this.dishMutable);
  }

  weightChanged(i: number, weight: number) {
    this.dishMutable.items[i].weight = weight;
    this.recalculateFormChanges(makeDishExt(this.dishMutable, this.ingredients));
  }

  saveDish() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.saved.next(this.dishMutable);
      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  deleteClicked() {
    this.deleted.next(this.dishMutable.id);
  }

  recalculateFormChanges(dish: DishExt) {
    this.recalculateTotal(dish);
    const equalToOriginal = isDishEqual(this.dishMutable, this._dishOriginal);
    if (equalToOriginal && this.form.dirty) { this.form.markAsPristine(); }
    if (!equalToOriginal && this.form.pristine) { this.form.markAsDirty(); }
  }

  recalculateTotal(dish: DishExt): void {
    if (dish && dish.itemsExt) {
      this.totalKkal = 0;
      this.totalProtein = 0;
      this.totalFat = 0;
      this.totalCarbon = 0;
      dish.itemsExt.forEach(de => {
        if (!de || !de.ingredient) { return; }
        this.totalKkal += de.ingredient.kkal100 / 100 * de.weight;
        this.totalProtein += de.ingredient.protein100 / 100 * de.weight;
        this.totalFat += de.ingredient.fat100 / 100 * de.weight;
        this.totalCarbon += de.ingredient.carbon100 / 100 * de.weight;
      });
    }
  }
}
