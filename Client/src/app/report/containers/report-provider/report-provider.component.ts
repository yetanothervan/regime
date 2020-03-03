import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-report-provider',
  template: `<rg-report-ingredients-list></rg-report-ingredients-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportProviderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
