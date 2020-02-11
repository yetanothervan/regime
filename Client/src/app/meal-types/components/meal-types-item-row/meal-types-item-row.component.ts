import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MealType } from 'src/app/dtos/meal-type';
import { copyMealType, isMealTypeEqual } from 'src/app/dtos';
import { Subject, Observable, interval } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { map, debounce } from 'rxjs/operators';

@Component({
  selector: 'rg-meal-types-item-row',
  templateUrl: './meal-types-item-row.component.html',
  styleUrls: ['./meal-types-item-row.component.scss']
})
export class MealTypesItemRowComponent implements OnInit {

  private _mealTypeOriginal: MealType;
  private _mealType: MealType;
  errorMessages: string;
  @Input() public get mealType(): MealType {
    return this._mealType;
  }
  public set mealType(value: MealType) {
    if (!this._mealType && value // if set for the first time
      || value && this._mealType && value.id !== this._mealType.id) { // or id != this.id
      this._mealType = value;
      this._mealTypeOriginal = copyMealType(value);
      this._mealTypeSub.next(this._mealType);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }
  _mealTypeSub: Subject<MealType>;
  _mealType$: Observable<MealType>;

  @Output() saved: EventEmitter<MealType> = new EventEmitter();
  form: FormGroup;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      kkal: 0,
      protein: 0,
      fat: 0,
      carbon: 0
    });

    this._mealTypeSub = new Subject<MealType>();
    this._mealType$ = this._mealTypeSub.asObservable().pipe(map(d => d));
    this._mealType$.subscribe(mealType => {
      this.patchForm(mealType);
      // some button enable/disable
      this.recalculateFormChanges(mealType);
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe((value) => {
      this.mealType.caption = value.caption;
      this.mealType.kkalTotal = value.kkal;
      this.mealType.proteinPart = value.protein;
      this.mealType.fatPart = value.fat;
      this.mealType.carbonPart = value.carbon;
      this.recalculateFormChanges(this.mealType);
    });
  }

  ngOnInit(): void {
  }

  patchForm(mealType: MealType) {
    this.form.patchValue({
      caption: mealType.caption
    });
  }

  recalculateFormChanges(mealType: MealType) {
    const equalToOriginal = isMealTypeEqual(this._mealType, this._mealTypeOriginal);
    if (equalToOriginal && this.form.dirty) { this.form.markAsPristine(); }
    if (!equalToOriginal && this.form.pristine) { this.form.markAsDirty(); }
  }

  save() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.saved.next(this.mealType);
      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  resetClicked() {
    this._mealTypeSub.next(this._mealTypeOriginal);
  }

}
