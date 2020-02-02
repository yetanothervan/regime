import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { takeWhile, startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import * as root from 'src/app/root-store';
import { DishesActions } from '../../state';
import { Observable, combineLatest, concat, merge } from 'rxjs';
import { Ingredient } from 'src/app/dtos/ingredient';
import { DishExt } from 'src/app/models/dish-ext';
import { DishItemExt } from 'src/app/models/dish-item-ext';
import { DishItem } from 'src/app/dtos/dish-item';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishItemComponent implements OnInit, OnDestroy {

  constructor(private store: Store<root.RootState>,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private sharedFunc: SharedFuncService,
    private router: Router) { }

  get ingredientArray(): FormArray {
    return this.dishForm.get('ingredientArray') as FormArray;
  }

  @ViewChild('dishCaption', { static: true }) dishCaptionInputRef: ElementRef;

  dishForm: FormGroup;
  dishExt: DishExt;
  componentIsActive = true;
  errorMessages = ''; // TODO
  ingredients$: Observable<Ingredient[]>;
  weight: number;

  totalKkal = 0;
  totalProtein = 0;
  totalFat = 0;
  totalCarbon = 0;
  addNewButtonDisabled = false;

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.ingredients$ = this.store.pipe(
      select(root.getEntitiesIngredients),
      map((ings) => {
        ings.sort((a: Ingredient, b: Ingredient) => {
          if (a.caption < b.caption) { return -1; }
          if (a.caption > b.caption) { return 1; }
          return 0;
        });
        return ings;
      })
    );

    combineLatest(
      this.store.select(root.getEntitiesIngredients),
      this.store.select(root.getDishById(id)))
      .pipe(
        takeWhile(() => this.componentIsActive))
      .subscribe(([ingredients, dish]) => {
        this.dishExt = new DishExt(dish, ingredients);
        this.reinitForm();
        this.cdr.detectChanges();
        this.dishCaptionInputRef.nativeElement.focus();
      });
  }

  reinitForm() {
    this.dishForm = this.fb.group({
      caption: [this.dishExt.caption, Validators.required],
      ingredientArray: this.fb.array([]),
      comment: [this.dishExt.comment],
    });
    this.dishExt.itemsExt.forEach(ing => {
      this.addIngredient(ing.ingredient, ing.weight);
    });
    this.recalculateTotal();
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

  removeIngredient(n: number): void {
    this.dishExt.itemsExt.splice(n, 1);
    this.checkAddButtonDisable();
    this.reinitForm();
    this.ingredientArray.markAsDirty();
  }

  addIngredient(ingredient: Ingredient, weight: number): void {
    this.ingredientArray.push(
      this.fb.group({
        ingredient: [ingredient],
        weight: [weight]
      }));
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
    if (this.dishForm.valid) {
      if (this.dishForm.dirty) {
        const dto: Dish = new Dish();
        dto.id = this.dishExt.id;
        dto.caption = this.dishExt.caption;
        dto.category = this.dishExt.category;
        dto.comment = this.dishExt.comment;
        dto.items = [];
        this.dishExt.itemsExt.forEach(i => {
          if (i.ingredient) {
            dto.items.push({ ingredientId: i.ingredient.id, weight: i.weight });
          }
        });


        if (!this.sharedFunc.ifEmpty(dto.id)) { // update
          this.store.dispatch(DishesActions.dishesUpdate({ dish: dto }));
          this.router.navigate(['../all'], { relativeTo: this.route });
        } else { // create
          this.store.dispatch(DishesActions.dishesCreate({ dish: dto }));
          this.router.navigate(['../all'], { relativeTo: this.route });
        }

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
