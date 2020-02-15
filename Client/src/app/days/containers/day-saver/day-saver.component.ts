import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'rg-day-saver',
  template: `
  <div class="row no-gutters m-2">
    <div class="col-auto">
        <button class="btn btn-primary">Save</button>
    </div>
    <div class="col-auto ml-3">
        <button class="btn btn-secondary">Reset</button>
    </div>
</div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaySaverComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
