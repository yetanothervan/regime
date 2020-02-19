import { Component, OnInit, Input, OnChanges, OnDestroy, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { WholeDayNutrientIndicator } from 'src/app/models/day.model';

@Component({
  selector: 'rg-day-nutrients',
  templateUrl: './day-nutrients.component.html',
  styleUrls: ['./day-nutrients.component.scss']
})
export class DayNutrientsComponent implements OnInit, OnChanges, OnDestroy {
  private _model: WholeDayNutrientIndicator;
  @Input()
  
  public get model(): WholeDayNutrientIndicator {
    return this._model;
  }
  public set model(value: WholeDayNutrientIndicator) {
    this._model = value;
    this.cdr.detectChanges();
  }

  active = true;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    let a = 0;
  }

  ngOnDestroy() {
    this.active = false;
  }
}
