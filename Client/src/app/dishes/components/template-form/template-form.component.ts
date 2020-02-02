import { Component, OnInit, ViewChild, ElementRef,
  SimpleChanges, Input, EventEmitter, Output,  OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounce, map } from 'rxjs/operators';
import { interval } from 'rxjs/internal/observable/interval';
import { TemplateDto } from 'src/app/dtos/tmp-dto';

@Component({
  selector: 'rg-template-form',
  templateUrl: './template-form.component.html'
})
export class TemplatePfixFormComponent implements OnInit, OnChanges {

  @ViewChild('templatePfixCaption', { static: true }) templatePfixCaptionInputRef: ElementRef;
  @Input() templateParam: TemplateDto;
  @Output() saved: EventEmitter<TemplateDto> = new EventEmitter();
  @Output() changed: EventEmitter<TemplateDto> = new EventEmitter();

  form: FormGroup;
  errorMessages = ''; // TODO

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.templateParam) { this.reinitForm(); }
  }

  reinitForm() {
    this.form = this.fb.group({
      caption: [this.templateParam.caption, Validators.required]
    });
    this.templatePfixCaptionInputRef.nativeElement.focus();

    this.form.valueChanges.pipe(
      debounce(() => interval(1000))
    ).subscribe(() => {
      const dto = { ...this.templateParam, ...this.form.value };
      this.changed.next(dto);
      console.log('changed');
    });
  }

  saveTemplatePfix() {
    if (this.form.valid) {
      if (this.form.dirty) {

        const dto = { ...this.templateParam, ...this.form.value };
        this.saved.next(dto);

      } else { // valid
        this.errorMessages = 'Проверьте корректность заполнения';
      }
    } // dirty
  }

}
