import { Component, OnInit, ViewChild, ElementRef,
  SimpleChanges, Input, EventEmitter, Output,  OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounce, map } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { Dish } from 'src/app/dtos/dish';

@Component({
  selector: 'rg-dish-form',
  templateUrl: './dish-form.component.html'
})
export class DishFormComponent implements OnInit, OnChanges {

  @ViewChild('dishCaption', { static: true }) dishCaptionInputRef: ElementRef;
  @Input() dish: Dish;
  @Output() saved: EventEmitter<Dish> = new EventEmitter();
  @Output() changed: EventEmitter<Dish> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dish) { this.reinitForm(); }
  }

  reinitForm() {
    this.form = this.fb.group({
      caption: [this.dish.caption, Validators.required]
    });
    this.dishCaptionInputRef.nativeElement.focus();

    this.form.valueChanges.pipe(
      debounce(() => interval(1000))
    ).subscribe(() => {
      const dto = { ...this.dish, ...this.form.value };
      this.changed.next(dto);
      console.log('changed');
    });
  }

  saveDish() {
    if (this.form.valid) {
      if (this.form.dirty) {

        const dto = { ...this.dish, ...this.form.value };
        this.saved.next(dto);

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

}
