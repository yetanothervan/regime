import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { RationDay } from 'src/app/dtos/ration-day';
import { MealType } from 'src/app/dtos/meal-type';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject, interval, Observable } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import { MealExt } from 'src/app/models/meal-ext';
import { DayModel } from 'src/app/models/day.model';
import { MealModel } from 'src/app/models/meal.model';

@Component({
  selector: 'rg-ration-day-form',
  templateUrl: './ration-day-form.component.html',
  styleUrls: ['./ration-day-form.component.scss']
})
export class RationDayFormComponent implements OnInit {
  private _dayModel: DayModel;

  @Input() public get dayModel(): DayModel {
    return this._dayModel;
  }
  public set dayModel(value: DayModel) {
    this._dayModel = value;
    if (this.dayModel?.caption$ && this.dayModel?.totalKkal$ ) this.patchForm(this.dayModel.caption$.value, this.dayModel.totalKkal$.value);
    if (this.dayModel?.meals$) this.mealTypeArray$ = this.dayModel.meals$.pipe(
      map(items => {
        const array = this.form.get('mealTypeArray') as FormArray;
        array.controls.splice(0);
        items.forEach(i => array.push(this.getMealGroup(i.mealTypeId$.value, i.id, i)));
        return array;
      })
    );

  }
  @Input() mealTypes$: Observable<MealType[]>;
  @Input() selectedMealId: string;
  @Output() mealSelected: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  mealTypeArray$: Observable<FormArray>;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      caption: ['', Validators.required],
      kkal: 0,
      mealTypeArray: this.fb.array([])
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe((value) => {
      this.dayModel.caption$.next(value.caption);
      this.dayModel.totalKkal$.next(value.kkal);
    });
  }

  ngOnInit() {
  }

  patchForm(caption: string, totalKkal: number) {
    this.form.patchValue({
      caption,
      kkal: totalKkal
    });
  }

  addNewMealType(): void {
    this.dayModel.addNewMealType();
  }

  getMealGroup(mealTypeId: string, id: string, mealModel: MealModel): FormGroup {
    return this.fb.group({
      id,
      mealTypeId,
      mealModel
    });
  }

  removeMealType(n: number): void {
    this.dayModel.removeMealType(n);
  }

  selectMeal(id: string) {
    this.mealSelected.next(id);
  }

}
