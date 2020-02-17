import { Injectable } from '@angular/core';
import { DayModel } from 'src/app/models/day.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentDayService {
  public currentDay$: BehaviorSubject<DayModel>;

  constructor() { 
    this.currentDay$ = new BehaviorSubject(new DayModel(null, null));
  }
}
