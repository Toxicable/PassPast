import { Component, OnInit, Input } from '@angular/core';
import { Question } from '../models/question';
import { CommentsHubService } from '../comments/comments-hub.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-question',
    templateUrl: 'question.component.html'
})
export class QuestionComponent implements OnInit {
    newCommentForm: FormGroup;

    @Input() question: Question;
    constructor(private commentsHub: CommentsHubService,
                private formBuilder: FormBuilder

    ) { }


    ngOnInit() {
        this.newCommentForm = this.formBuilder.group({
            content: ['']
        });
     }


     sendComment(questionId: string){
         //this.commentsHub.server.post(this.newCommentForm.value['content'], questionId);
     }

}
