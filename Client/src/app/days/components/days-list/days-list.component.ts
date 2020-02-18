import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { RationDayExt } from 'src/app/models/day-ext';

@Component({
  selector: 'rg-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {

  @Input() days: RationDayExt[];
  @Input() selectedDayId: string;
  @Output() added: EventEmitter<boolean> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();
  @Output() selected: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
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
