import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ExamService } from '../exam.service';
import { AlertService } from '../../../core/services/alert.service';
import { AppState } from '../../../app/app-store';
import { Store } from '@ngrx/store';
import { Exam } from '../../models/exam';
import { QuestionService } from '../../questions/question.service';

@Component({
    selector: 'add-exam',
    templateUrl: 'add-exam.component.html'
})
export class AddExamComponent implements OnInit {
    constructor(private formBuilder: FormBuilder,
                private exams: ExamService,
                private alert: AlertService,
                private store: Store<AppState>,
                private questions: QuestionService
    ) { }

    newExamForm: FormGroup

    ngOnInit(): void {
        this.newExamForm = this.formBuilder.group({
            year: ['', Validators.required],
            semester: ['', Validators.required],
            sections: this.formBuilder.array([
                this.newSection()
            ])
        })        
        
        console.log(this.newExamForm)
    }

    addSection(){
        const control = <FormArray>this.newExamForm.controls['sections']
        control.push(this.newSection())
    }

    newSection(){
        return this.formBuilder.group({
                        count: ['', Validators.required],
                        type: ['', Validators.required]
                    })                
    }

    removeSection(i: number) {
        const control = <FormArray>this.newExamForm.controls['sections']
        control.removeAt(i);
    }

    onSubmit(){
        
        this.store.map(state => state.courses.paper.selected.id)
            .first()
            .flatMap((paperId: number) => {
                let newExam = Object.assign({}, {paperId}, this.newExamForm.value)
                delete newExam["sections"];
                return this.exams.create(newExam)
                    .flatMap((exam: Exam) => {
                        
                        let data = Object.assign({}, {examId: exam.id},this.newExamForm.value)
                        return this.questions.create(data)
                    })

            })
            .subscribe(() => this.alert.sendSuccess("wow we actually did it :D"))



    }
}