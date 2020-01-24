import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-dishes-shell',
  templateUrl: './dishes-shell.component.html',
  styleUrls: ['./dishes-shell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishesShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
