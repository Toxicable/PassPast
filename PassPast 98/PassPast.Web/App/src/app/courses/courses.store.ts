import { ActionReducer, combineReducers } from '@ngrx/store';
import { ExamState, examReducer } from './exams/exam.reducer';
import { PaperState, paperReducer } from './papers/paper.reducer';
import { CourseState, courseReducer } from './courses/course.reducer';
import { QuestionState, questionReducer } from './questions/question.reducer';
import { AnswerState, answerReducer } from './answers/answer.reducer';
import { CommentState, commentReducer } from './comments/comment.reducer';

export interface CoursesState {
    course: CourseState,
    paper: PaperState,
    exam: ExamState,
    question: QuestionState,
    answer: AnswerState,
    comment: CommentState
}

const reducers = {
    course: courseReducer,
    paper: paperReducer,
    exam: examReducer,
    question: questionReducer,
    answer: answerReducer,
    comment: commentReducer
};

const reducer: ActionReducer<CoursesState> = combineReducers(reducers);

export function coursesReducer(state: any, action: any) {
    return reducer(state, action);
}
