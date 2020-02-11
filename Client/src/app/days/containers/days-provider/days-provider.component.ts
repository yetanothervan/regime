import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { RationDay } from 'src/app/dtos/ration-day';
import { Store } from '@ngrx/store';
import * as root from 'src/app/root-store';

@Component({
  selector: 'rg-days-provider',
  template: `<rg-days-list [days]="days$ | async"></rg-days-list>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DaysProviderComponent implements OnInit {

  days$: Observable<RationDay[]>;
  constructor(private store: Store<root.RootState>) {
      this.days$ = this.store.select(root.getEntitiesDays);
    }

  ngOnInit(): void {
  }

}
