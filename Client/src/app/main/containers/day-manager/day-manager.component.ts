import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { RationDay } from 'src/app/dtos/ration-day';
import { Store, select } from '@ngrx/store';
import * as fromMain from '../../state/main.reducer';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'rg-day-manager',
  templateUrl: './day-manager.component.html',
  styleUrls: ['./day-manager.component.sass'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DayManagerComponent implements OnInit, OnDestroy {
  @ViewChild('dayCaptionInputRef', { static: true }) dayCaptionInputRef: ElementRef;
  componentIsActive = true;
  dayForm: FormGroup;
  day: RationDay;
  constructor(private store: Store<fromMain.MainState>, private fb: FormBuilder) { }

  ngOnInit() {
    this.store.pipe(select(fromMain.getSelectedDay),
      takeWhile(() => this.componentIsActive))
      .subscribe((day: RationDay) => {
        this.day = day;
        this.reinitForm();
      });
  }

  reinitForm() {
    this.dayForm = this.fb.group({
      dayCaption: [this.day.caption, Validators.required]
    });
    this.dayCaptionInputRef.nativeElement.focus();
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }
}
