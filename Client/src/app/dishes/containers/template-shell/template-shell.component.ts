import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-template-shell',
  templateUrl: './template-shell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePfixShellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
