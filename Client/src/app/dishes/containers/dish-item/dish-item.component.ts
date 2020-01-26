import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import * as root from 'src/app/root-store';
import { Dish } from 'src/app/dtos/dish';
import { DishesActions } from '../../state';

@Component({
  selector: 'rg-dish-item',
  templateUrl: './dish-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DishItemComponent implements OnInit, OnDestroy {

  @ViewChild('dishCaption', { static: true }) dishCaptionInputRef: ElementRef;

  dishForm: FormGroup;
  dish: Dish;
  componentIsActive = true;
  errorMessages = ''; // TODO

  constructor(private store: Store<root.RootState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private sharedFunc: SharedFuncService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.pipe(select(root.getDishById(id)),
      takeWhile(() => this.componentIsActive))
      .subscribe((dish: Dish) => {
        this.dish = dish;
        this.reinitForm();
      });
  }

  reinitForm() {
    this.dishForm = this.fb.group({
      caption: [this.dish.caption, Validators.required],
      comment: [this.dish.comment],
    });
    this.cdr.detectChanges();
    this.dishCaptionInputRef.nativeElement.focus();
  }

  saveDish() {
    if (this.dishForm.valid) {
      if (this.dishForm.dirty) {

        const dto = { ...this.dish, ...this.dishForm.value };

        if (!this.sharedFunc.ifEmpty(dto.id)) { // update
          this.store.dispatch(DishesActions.dishesUpdate({dish: dto}));
          this.router.navigate(['../all'], {relativeTo: this.route});
        } else { // create
          this.store.dispatch(DishesActions.dishesCreate({dish: dto}));
          this.router.navigate(['../all'], {relativeTo: this.route});
        }

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
