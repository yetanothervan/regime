import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';
import { IngActions } from '../../state';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedFuncService } from 'src/app/shared/services/shared-func.service';
import * as root from 'src/app/root-store';

@Component({
  selector: 'rg-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientItemComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientCaption', { static: true }) ingredientCaptionInputRef: ElementRef;

  ingForm: FormGroup;
  ingredient: Ingredient;
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
    this.store.pipe(select(root.getIngredientById(id)),
      takeWhile(() => this.componentIsActive))
      .subscribe((ing: Ingredient) => {
        this.ingredient = ing;
        this.reinitForm();
      });
  }

  reinitForm() {
    this.ingForm = this.fb.group({
      caption: [this.ingredient.caption, Validators.required],
      kkal100: [this.ingredient.kkal100, Validators.required],
      protein100: [this.ingredient.protein100, Validators.required],
      fat100: [this.ingredient.fat100, Validators.required],
      carbon100: [this.ingredient.carbon100, Validators.required],
      comment: [this.ingredient.comment],
    });
    this.cdr.detectChanges();
    this.ingredientCaptionInputRef.nativeElement.focus();
  }

  saveIngredient() {
    if (this.ingForm.valid) {
      if (this.ingForm.dirty) {

        const dto = { ...this.ingredient, ...this.ingForm.value };

        if (!this.sharedFunc.ifEmpty(dto.id)) { // update
          this.store.dispatch(IngActions.ingredientsUpdate({ingredient: dto}));
          this.router.navigate(['../all'], {relativeTo: this.route});
        } else { // create
          this.store.dispatch(IngActions.ingredientsCreate({ingredient: dto}));
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
