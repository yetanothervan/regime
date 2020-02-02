import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import * as me from '../../state';
import { Store, select } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import { TemplateDto } from 'src/app/dtos/tmp-dto';

@Component({
  selector: 'rg-template-item',
  templateUrl: './template-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplatePfixItemComponent implements OnInit, OnDestroy {

  templateParam$: Observable<TemplateDto>;

  constructor(private store: Store<me.TemplatePfixState>,
              private route: ActivatedRoute,
              private shared: SharedFuncService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(me.TemplateActions.templatePfixPathEditNavigated({id}));
    this.templateParam$ = this.store.pipe(select(me.getTemplatePfixCurrent));
  }

  onSaved(templateParam: TemplateDto) {
    if (!this.shared.ifEmpty(templateParam.id)) { // update
      this.store.dispatch(me.TemplateActions.templatePfixUpdate({templateParam}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    } else { // create
      this.store.dispatch(me.TemplateActions.templatePfixCreate({templateParam}));
      this.router.navigate(['../all'], {relativeTo: this.route});
    }
  }

  onChanged(templateParam: TemplateDto) {
    this.store.dispatch(me.TemplateActions.templatePfixSetCurrentEditing({templateParam}));
  }

  ngOnDestroy() {
  }

}
