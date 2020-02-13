import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RationDay } from 'src/app/dtos/ration-day';

@Component({
  selector: 'rg-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {

  private _selectedDayId: string;

  @Input() days: RationDay[];
  @Input() selectedDayId: string;
  @Output() saved: EventEmitter<RationDay> = new EventEmitter();
  @Output() added: EventEmitter<boolean> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSaved(day: RationDay) {
    this.saved.next(day);
  }
  removeRationDay(index: number) {
    this.deleted.next(this.days[index].id);
  }
  addNewRationDay() {
    this.added.next(true);
  }
  selectDay(id: string) {
    this.selected.next(id);
  }

}
