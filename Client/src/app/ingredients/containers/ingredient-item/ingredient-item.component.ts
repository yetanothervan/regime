import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
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

  @ViewChild('ingredientCaption', { static: true }) ingredientCaptionInputRef: ElementRef;

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
      caption: [this.ingredient.caption, Validators.required],
      kkal100: [this.ingredient.kkal100, Validators.required],
      protein100: [this.ingredient.protein100, Validators.required],
      fat100: [this.ingredient.fat100, Validators.required],
      carbon100: [this.ingredient.carbon100, Validators.required],
      comment: [this.ingredient.comment, Validators.required],
    });
    this.cdr.detectChanges();
    this.ingredientCaptionInputRef.nativeElement.focus();
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
