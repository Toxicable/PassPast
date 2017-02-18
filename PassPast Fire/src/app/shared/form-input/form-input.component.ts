import { FormControl, FormGroup } from '@angular/forms';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html'
})
export class FormInputComponent {

  @Input() control: FormControl;
  @Input() placeholder: string;
  @Input() group: FormGroup;
}
