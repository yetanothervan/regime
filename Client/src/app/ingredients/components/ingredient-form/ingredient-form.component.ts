import { Component, OnInit, ViewChild, ElementRef, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';

@Component({
  selector: 'rg-ingredient-form',
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent implements OnInit {

  @ViewChild('ingredientCaption', { static: true }) ingredientCaptionInputRef: ElementRef;
  @Input() ingredient: Ingredient;
  @Output() saved: EventEmitter<Ingredient> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    if (this.ingredient) { this.reinitForm(); }
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
