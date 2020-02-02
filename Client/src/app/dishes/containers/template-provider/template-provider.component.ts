import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Observable, combineLatest } from 'rxjs';
import * as me from '../../state';
import * as root from 'src/app/root-store';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TemplateDto } from 'src/app/dtos/tmp-dto';

@Component({
  selector: 'rg-template-provider',
  templateUrl: './template-provider.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePfixProviderComponent implements OnInit {

  filteredAndSortedTemplatePfix$: Observable<TemplateDto[]>;
  sorting$: Observable<Sort>;
  filterString$: Observable<string>;

  constructor(private store: Store<root.RootState>) {
    this.filterString$ = this.store.select(me.getFilterString);
    this.sorting$ = this.store.select(me.getSorting);
    this.filteredAndSortedTemplatePfix$ = combineLatest(
      this.store.select(root.getEntitiesTemplatePfix),
      this.filterString$,
      this.sorting$).pipe(
        map(([ings, filter, sort]) => {
          const filtered = ings.filter(item => item && item.caption && item.caption.toLowerCase().includes(filter.toLowerCase()));
          if (!sort.active || !sort.direction) { return filtered; }
          filtered.sort((a, b) => {
            const keyA = a[sort.active];
            const keyB = b[sort.active];
            if (sort.direction === 'asc') {
              if (keyA < keyB) { return -1; }
              if (keyA > keyB) { return 1; }
              return 0;
            } else {
              if (keyA > keyB) { return -1; }
              if (keyA < keyB) { return 1; }
              return 0;
            }
          });
          return filtered;
        })
      );
  }

  filterStringChanged(filterString: string) {
    this.store.dispatch(me.TemplateActions.templatePfixSetFilter({filterString}));
  }

  sortingChanged(sorting: Sort) {
    this.store.dispatch(me.TemplateActions.templatePfixSetSorting({sorting}));
  }

  ngOnInit() {
    this.store.dispatch(me.TemplateActions.templatePfixPathAllNavigated());
  }

}
