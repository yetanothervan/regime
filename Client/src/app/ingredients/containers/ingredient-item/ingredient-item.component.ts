import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';
import * as fromIng from '../../state/ingredients.reducer';
import * as ingActions from '../../state/ingredients.actions';
import { Store, select } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'rg-ingredient-item',
  templateUrl: './ingredient-item.component.html',
  styleUrls: ['./ingredient-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IngredientItemComponent implements OnInit, OnDestroy {

  ingForm: FormGroup;
  ingredient: Ingredient;
  componentIsActive = true;

  constructor(private store: Store<fromIng.IngredientsState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.pipe(select(fromIng.getIngredientById(id)),
      takeWhile(() => this.componentIsActive))
      .subscribe((ing: Ingredient) => {
        this.ingredient = ing;
        this.reinitForm();
      });
  }

  reinitForm() {
    this.ingForm = this.fb.group({
      ingCaption: [this.ingredient.caption, Validators.required]
    });
    this.cdr.detectChanges();
    // this.dayCaptionInputRef.nativeElement.focus();
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
