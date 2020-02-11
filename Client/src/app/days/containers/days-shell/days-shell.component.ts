import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-days-shell',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
