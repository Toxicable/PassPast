import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ExamService } from '../exam.service';
import { AlertService } from '../../../core/services/alert.service';

@Component({
    selector: 'add-exam',
    templateUrl: 'add-exam.component.html'
})
export class AddExamComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private exams: ExamService,
                private alert: AlertService
    ) { }

    newExamForm: FormGroup

    ngOnInit(): void {
        this.newExamForm = this.formBuilder.group({
            name: ['', [Validators.required]],
            code: ['', [Validators.required]],
        });
    }

    onSubmit(){
        this.exams.create(this.newExamForm.value)
            .subscribe(() => this.alert.sendSuccess("SUccessfully crreate the Course :D"));
    }
}