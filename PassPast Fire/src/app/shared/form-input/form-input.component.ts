import { FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-input',
  templateUrl: 'form-input.component.html'
})
export class FormInputComponent implements OnInit {
  control: AbstractControl;
  @Input() controlName: string;
  @Input() placeholder: string;
  @Input() group: FormGroup;

  ngOnInit() {
    this.control = this.group.get(this.controlName);
  }

}
