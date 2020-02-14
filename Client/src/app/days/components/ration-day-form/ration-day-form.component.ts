import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RationDay } from 'src/app/dtos/ration-day';
import { MealType } from 'src/app/dtos/meal-type';
import { copyRationDay, isRationDayEqual } from 'src/app/dtos';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable, interval } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import { Meal } from 'src/app/dtos/meal';

@Component({
  selector: 'rg-ration-day-form',
  templateUrl: './ration-day-form.component.html',
  styleUrls: ['./ration-day-form.component.scss']
})
export class RationDayFormComponent implements OnInit {
  private _dayOriginal: RationDay;
  private _dayMutable: RationDay;
  private _mealTypes: MealType[];

  @Input() public get dayMutable(): RationDay {
    return this._dayMutable;
  }
  public set dayMutable(value: RationDay) {
    if (!this._dayMutable && value // if set for the first time
      || value && this._dayMutable && value.id !== this._dayMutable.id) { // or id != this.id
      this._dayMutable = value;
      this._dayOriginal = copyRationDay(value);
      this.daySub.next(this._dayMutable);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }

  @Input() public get mealTypes(): MealType[] {
    return this._mealTypes;
  }
  public set mealTypes(value: MealType[]) {
    this._mealTypes = value;
    if (this.dayMutable) { this.daySub.next(this.dayMutable); }
  }

  @Input() deleteStatus: string;

  @Output() saved: EventEmitter<RationDay> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  daySub: Subject<RationDay>;
  day$: Observable<RationDay>;

  addNewButtonDisabled = false;

  get mealTypeArray(): FormArray {
    return this.form.get('mealTypeArray') as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      mealTypeArray: this.fb.array([])
    });

    this.daySub = new Subject<RationDay>();
    this.day$ = this.daySub.asObservable().pipe(map(d => d));
    this.day$.subscribe( day => {
      this.patchForm(day);
      this.recalculateFormChanges(day);
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe((value) => {
      this.dayMutable.caption = value.caption;
      this.recalculateFormChanges(this.dayMutable);
    });
  }

  ngOnInit() {
  }

  patchForm(day: RationDay) {
    this.form.patchValue({
      caption: day.caption
    });
    const array = this.mealTypeArray;
    array.controls.splice(0);
    day.meals.forEach(i => {
      const mealType = this.mealTypes.find(m => m.id === i.mealTypeId);
      array.push(this.getMealTypeGroup(mealType));
    });
  }

  addNewMealType(): void {
    const meal = { mealTypeId: '', id: '', mealItems: [] } as Meal;
    this.dayMutable.meals.push(meal);
    this.daySub.next(this.dayMutable);
  }

  getMealTypeGroup(mealType: MealType): FormGroup {
    return this.fb.group({
      mealType: [mealType]
    });
  }

  removeMealType(n: number): void {
    this.dayMutable.meals.splice(n, 1);
    this.daySub.next(this.dayMutable);
  }

  mealTypeChanged(i: number, mealType: MealType) {
    this.dayMutable.meals[i].mealTypeId = mealType.id;
    this.daySub.next(this.dayMutable);
  }

  saveRationDay() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.saved.next(this.dayMutable);
      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  deleteClicked() {
    this.deleted.next(this.dayMutable.id);
  }

  recalculateFormChanges(day: RationDay) {
    this.addNewButtonDisabled = day.meals.some(item => !item.mealTypeId);
    const equalToOriginal = isRationDayEqual(this.dayMutable, this._dayOriginal);
    if (equalToOriginal && this.form.dirty) { this.form.markAsPristine(); }
    if (!equalToOriginal && this.form.pristine) { this.form.markAsDirty(); }
  }
}
