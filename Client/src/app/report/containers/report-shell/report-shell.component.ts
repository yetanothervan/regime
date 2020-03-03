import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-report-shell',
  template: `<div style="margin-top: 20px">
  <router-outlet></router-outlet>
  </div>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
