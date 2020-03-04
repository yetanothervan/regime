import { Component, OnInit, Input } from '@angular/core';
import { ReportDay } from '../../models/report-day';

@Component({
  selector: 'rg-report-ingredients-list',
  templateUrl: './report-ingredients-list.component.html',
  styleUrls: ['./report-ingredients-list.component.scss']
})
export class ReportIngredientsListComponent implements OnInit {

  @Input() reportDays: ReportDay[];

  constructor() { }

  ngOnInit(): void {
  }

}
