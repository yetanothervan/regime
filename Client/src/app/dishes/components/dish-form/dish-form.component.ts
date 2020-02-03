import {
  Component, OnInit, ViewChild, ElementRef,
  SimpleChanges, Input, EventEmitter, Output, OnChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { DishExt } from 'src/app/models/dish-ext';
import { Ingredient } from 'src/app/dtos/ingredient';
import { Dish } from 'src/app/dtos/dish';
import { DishItemExt } from 'src/app/models/dish-item-ext';
import { DishItem } from 'src/app/dtos/dish-item';

@Component({
  selector: 'rg-dish-form',
  templateUrl: './dish-form.component.html'
})
export class DishFormComponent implements OnInit, OnChanges {

  @ViewChild('dishCaption', { static: true }) dishCaptionInputRef: ElementRef;
  @Input() dishExt: DishExt;
  @Input() ingredients: Ingredient[];
  @Output() saved: EventEmitter<Dish> = new EventEmitter();
  @Output() changed: EventEmitter<Dish> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO
  get ingredientArray(): FormArray {
    return this.form.get('ingredientArray') as FormArray;
  }

  totalKkal = 0;
  totalProtein = 0;
  totalFat = 0;
  totalCarbon = 0;
  addNewButtonDisabled = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.dishCaptionInputRef.nativeElement.focus();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dishExt || changes.ingredients) { this.reinitForm(); }
  }

  reinitForm() {
    this.form = this.fb.group({
      caption: [this.dishExt.caption, Validators.required],
      ingredientArray: this.fb.array([]),
      comment: this.dishExt.comment
    });
    this.dishExt.itemsExt.forEach(ing => {
      this.addIngredient(ing.ingredient, ing.weight);
    });
    this.recalculateTotal();

    this.form.valueChanges.pipe(
      debounce(() => interval(1000))
    ).subscribe(() => {
      const dto = this.getDto();
      this.changed.next(dto);
      console.log('changed');
    });
  }

  getDto(): Dish {
    const dto: Dish = {
      id: this.dishExt.id,
      caption: this.form.value.caption,
      category: this.form.value.category,
      comment: this.form.value.comment,
      items: []
    };
    this.dishExt.itemsExt.forEach(i => {
      if (i.ingredient) {
        dto.items.push({ ingredientId: i.ingredient.id, weight: i.weight });
      }
    });
    return dto;
  }

  addNewIngredient(): void {
    const newIng = new DishItemExt(new DishItem(), null);
    const indexLast =
      this.dishExt.itemsExt.push(newIng) - 1;
    const last = this.dishExt.itemsExt[indexLast];
    last.weight = 0;
    this.ingredientArray.push(
      this.fb.group({
        selector: [last.ingredient],
        weight: [last.weight]
      }));
    this.ingredientArray.markAsDirty();
    this.addNewButtonDisabled = true;
  }

  addIngredient(ingredient: Ingredient, weight: number): void {
    this.ingredientArray.push(
      this.fb.group({
        ingredient: [ingredient],
        weight: [weight]
      }));
  }

  removeIngredient(n: number): void {
    this.dishExt.itemsExt.splice(n, 1);
    this.checkAddButtonDisable();
    this.reinitForm();
    this.ingredientArray.markAsDirty();
  }

  checkAddButtonDisable() {
    this.addNewButtonDisabled = this.dishExt.itemsExt.some(item => !item.ingredient);
  }

  ingredientChanged(i: number, ingredient: Ingredient) {
    this.dishExt.itemsExt[i].ingredient = ingredient;
    this.checkAddButtonDisable();
    this.recalculateTotal();
    this.ingredientArray.markAsDirty();
  }

  weightChanged(i: number, weight: number) {
    this.dishExt.itemsExt[i].weight = weight;
    this.recalculateTotal();
  }

  saveDish() {
    if (this.form.valid) {
      if (this.form.dirty) {

        const dto = { ...this.dishExt, ...this.form.value };
        this.saved.next(dto);

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  recalculateTotal(): void {
    if (this.dishExt && this.dishExt.itemsExt) {
      this.totalKkal = 0;
      this.totalProtein = 0;
      this.totalFat = 0;
      this.totalCarbon = 0;
      this.dishExt.itemsExt.forEach(de => {
        if (!de || !de.ingredient) { return; }
        this.totalKkal += de.ingredient.kkal100 / 100 * de.weight;
        this.totalProtein += de.ingredient.protein100 / 100 * de.weight;
        this.totalFat += de.ingredient.fat100 / 100 * de.weight;
        this.totalCarbon += de.ingredient.carbon100 / 100 * de.weight;
      });
    }
  }

}
