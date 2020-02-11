import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-meal-types-shell',
  template: `<router-outlet></router-outlet>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MealTypesShellComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
