import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { takeWhile, startWith, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import * as root from 'src/app/root-store';
import { Dish } from 'src/app/dtos/dish';
import { DishesActions } from '../../state';
import { Observable, combineLatest, concat, merge } from 'rxjs';
import { Ingredient } from 'src/app/dtos/ingredient';
import { DishExt } from 'src/app/models/dish-ext';

@Component({
  selector: 'rg-dish-item',
  templateUrl: './dish-item.component.html',
  styleUrls: ['./dish-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishItemComponent implements OnInit, OnDestroy {

  @ViewChild('dishCaption', { static: true }) dishCaptionInputRef: ElementRef;

  dishForm: FormGroup;
  dishExt: DishExt;
  componentIsActive = true;
  errorMessages = ''; // TODO
  ingredients$: Observable<Ingredient[]>;
  ingredient: Ingredient;
  weight: number;


  compareFn: ((i1: Ingredient, i2: Ingredient) => boolean) | null = this.compareByValue;
  compareByValue(i1: Ingredient, i2: Ingredient) {
    return i1 && i2 && i1.id === i2.id;
  }

  constructor(private store: Store<root.RootState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private sharedFunc: SharedFuncService,
              private router: Router) { }

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
    this.cdr.detectChanges();
    this.dishCaptionInputRef.nativeElement.focus();
  }

  get ingredientArray(): FormArray {
    return this.dishForm.get('ingredientArray') as FormArray;
  }

  addNewIngredient(): void {
    this.dishExt.items.push();
    const last = this.dishExt.itemsExt[this.dishExt.itemsExt.push() - 1];
    this.ingredientArray.push(
      this.fb.group({
        selector: [last.ingredient],
        weight: [last.weight]
      }));
  }

  addIngredient(ingredient: Ingredient, weight: number): void {
    this.ingredientArray.push(
      this.fb.group({
        selector: [ingredient],
        weight: [weight]
      }));
  }

  saveDish() {
    if (this.dishForm.valid) {
      if (this.dishForm.dirty) {

        const dto = { ...this.dishExt, ...this.dishForm.value };

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
