import { Component, OnInit, ViewChild, ElementRef, 
  SimpleChanges, Input, EventEmitter, Output, OnDestroy, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';
import { debounce, map } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';

@Component({
  selector: 'rg-ingredient-form',
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent implements OnInit, OnChanges {

  @ViewChild('ingredientCaption', { static: true }) ingredientCaptionInputRef: ElementRef;
  @Input() ingredient: Ingredient;
  @Output() saved: EventEmitter<Ingredient> = new EventEmitter();
  @Output() changed: EventEmitter<Ingredient> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    // if (changes.ingredient) { this.reinitForm(); }
  }

  reinitForm() {
    this.form = this.fb.group({
      caption: [this.ingredient.caption, Validators.required],
      kkal100: [this.ingredient.kkal100, Validators.required],
      protein100: [this.ingredient.protein100, Validators.required],
      fat100: [this.ingredient.fat100, Validators.required],
      carbon100: [this.ingredient.carbon100, Validators.required],
      comment: [this.ingredient.comment],
    });
    this.ingredientCaptionInputRef.nativeElement.focus();

    this.form.valueChanges.pipe(
      debounce(() => interval(1000))
    ).subscribe(() => {
      const dto = { ...this.ingredient, ...this.form.value };
      this.changed.next(dto);
      console.log('changed');
    });
  }

  saveIngredient() {
    if (this.form.valid) {
      if (this.form.dirty) {

        const dto = { ...this.ingredient, ...this.form.value };
        this.saved.next(dto);

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

}
