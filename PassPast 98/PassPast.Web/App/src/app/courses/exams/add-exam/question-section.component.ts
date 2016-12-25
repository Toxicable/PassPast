import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'app-question-section',
    templateUrl: './question-section.component.html',
    styleUrls: ['./question-section.component.css']
})
export class QuestionSectionComponent{
    @Input() sectionForm: FormGroup;

    constructor(private formBuilder: FormBuilder
    ) { }

    newSection(){
        return this.formBuilder.group({
                        incrimentationScheme: ['', Validators.required],
                        count: ['', Validators.required],
                        type: ['', Validators.required],
                        subQuestions: this.formBuilder.array([])
                    });
    }

    addSubQuestion(){
        const control = <FormArray>this.sectionForm.controls['subQuestions'];
        control.push(this.newSection());
    }
    addSection(){
        const control = <FormArray>this.sectionForm.controls['subQuestions'];
        control.push(this.newSection())
    }

     removeSection(i: number) {
       const control = <FormArray>this.sectionForm.controls['subQuestions'];
        control.removeAt(i);
    }
}