import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-ingredients-shell',
  templateUrl: './ingredients-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientsShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
