import { Component, OnInit, ViewChild, ElementRef, 
  SimpleChanges, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/dtos/ingredient';
import { debounce, map } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { copyIngredient, isIngredientEqual } from 'src/app/dtos';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'rg-ingredient-form',
  templateUrl: './ingredient-form.component.html'
})
export class IngredientFormComponent implements OnInit {
  private _ingredientOriginal: Ingredient;
  private _ingredientMutable: Ingredient;

  @Input() public get ingredientMutable(): Ingredient {
    return this._ingredientMutable;
  }
  public set ingredientMutable(value: Ingredient) {
    if (!this._ingredientMutable && value // if set for the first time
      || value && this._ingredientMutable && value.id !== this._ingredientMutable.id) { // or id != this.id
      this._ingredientMutable = value;
      this._ingredientOriginal = copyIngredient(value);
      this.ingredientSub.next(this._ingredientOriginal);
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }
  }
  @Input() deleteStatus: string;
  @Output() saved: EventEmitter<Ingredient> = new EventEmitter();
  @Output() deleted: EventEmitter<string> = new EventEmitter();

  @ViewChild('ingredientCaption', { static: true }) ingredientCaptionInputRef: ElementRef;
  form: FormGroup;
  errorMessages = ''; // TODO

  ingredientSub: Subject<Ingredient>;
  ingredient$: Observable<Ingredient>;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.group({
      caption: ['', Validators.required],
      kkal100: [0, Validators.required],
      protein100: [0, Validators.required],
      fat100: [0, Validators.required],
      carbon100: [0, Validators.required],
      comment: [''],
    });

    this.ingredientSub = new Subject<Ingredient>();
    this.ingredient$ = this.ingredientSub.asObservable();
    this.ingredient$.subscribe( ingredient => {
      this.patchForm(ingredient);
      this.recalculateFormChanges(ingredient);
    });

    this.form.valueChanges.pipe(
      debounce(() => interval(500))
    ).subscribe((value) => {
      this.ingredientMutable.caption = value.caption;
      this.ingredientMutable.kkal100  = value.kkal100;
      this.ingredientMutable.protein100 = value.protein100;
      this.ingredientMutable.fat100 = value.fat100;
      this.ingredientMutable.carbon100 = value.carbon100;
      this.ingredientMutable.comment = value.comment;
      this.recalculateFormChanges(this.ingredientMutable);
    });
  }

  ngOnInit() {
    this.ingredientCaptionInputRef.nativeElement.focus();
  }

  patchForm(ingredient: Ingredient) {
    this.form.patchValue({
      caption: ingredient.caption,
      kkal100: ingredient.kkal100,
      protein100: ingredient.protein100,
      fat100: ingredient.fat100,
      carbon100: ingredient.carbon100,
      comment: ingredient.comment,
    });
  }

  saveIngredient() {
    if (this.form.valid) {
      if (this.form.dirty) {
        this.saved.next(this.ingredientMutable);
      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

  deleteClicked() {
    this.deleted.next(this.ingredientMutable.id);
  }

  recalculateFormChanges(ingredient: Ingredient) {
    const equalToOriginal =
      isIngredientEqual(this.ingredientMutable, this._ingredientOriginal);
    if (equalToOriginal && this.form.dirty) { this.form.markAsPristine(); }
    if (!equalToOriginal && this.form.pristine) { this.form.markAsDirty(); }
  }

}
