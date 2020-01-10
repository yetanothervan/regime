import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-main-shell',
  templateUrl: './main-shell.component.html',
  styleUrls: ['./main-shell.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
