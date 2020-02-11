import { Component, OnInit, Input } from '@angular/core';
import { RationDay } from 'src/app/dtos/ration-day';

@Component({
  selector: 'rg-days-list',
  templateUrl: './days-list.component.html',
  styleUrls: ['./days-list.component.scss']
})
export class DaysListComponent implements OnInit {

  @Input()  days: RationDay[];

  constructor() { }

  ngOnInit(): void {
  }

}
