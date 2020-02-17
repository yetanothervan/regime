import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RationDay } from 'src/app/dtos/ration-day';
import { MealType } from 'src/app/dtos/meal-type';
import { copyRationDay, isRationDayEqual, newMeal } from 'src/app/dtos';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Subject, Observable, interval } from 'rxjs';
import { map, debounce } from 'rxjs/operators';
import { MealExt } from 'src/app/models/meal-ext';
import { DayModel } from 'src/app/models/day.model';

@Component({
  selector: 'rg-ration-day-form',
  templateUrl: './ration-day-form.component.html',
  styleUrls: ['./ration-day-form.component.scss']
})
export class RationDayFormComponent implements OnInit {
  @Input() dayModel: DayModel;
  @Input() mealTypes: MealType[];
  @Input() selectedMealId: string;
  @Output() mealSelected: EventEmitter<string> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  get mealTypeArray(): FormArray {
    return this.form.get('mealTypeArray') as FormArray;
  }

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

  patchForm(day: RationDay) {
    this.form.patchValue({
      caption: day.caption,
      kkal: day.totalKkal
    });
  }

  addNewMealType(): void {
    this.dayModel.addNewMealType();
  }

  getMealGroup(mealType: MealType, id: string): FormGroup {
    return this.fb.group({
      id,
      mealType,
      mealExt$: new Subject<MealExt>(),
      dayModel: this.dayModel,
      meal$: this.dayModel ? this.dayModel.meals$.pipe(map(ms => ms.find(m => m.mealId === id))) : null
    });
  }

  removeMealType(n: number): void {
    this.dayModel.removeMealType(n);
  }

  selectMeal(id: string) {
    this.mealSelected.next(id);
  }

}
