import { Action } from '@ngrx/store';
import { QuestionActionTypes } from './question.actions';
import { AppState } from '../../app-store';
import { Dict } from '../models/dict';
import { NormQuestion } from '../models/norm-question';

export interface QuestionState {
  entities: Dict<NormQuestion>;
  selected: number[]
}

const initalState: QuestionState = {
  entities: {},
  selected: [],
};

export function questionReducer(state = initalState, action: Action): QuestionState {
  switch (action.type) {

    case QuestionActionTypes.DESELECT:
      return {
        entities: state.entities,
        selected: []
      };

    case QuestionActionTypes.LOAD_SUCCESS:
      return {
        entities: action.payload,
        selected: state.selected
      };

    case QuestionActionTypes.SELECT_SUCCESS:
      return {
        entities: state.entities,
        selected: action.payload
      };

    case QuestionActionTypes.ADD_ANSWER:
      let answerQuestion = state.entities[action.payload.questionId];
      answerQuestion.answers = [...answerQuestion.answers, action.payload.id];
      return {
        selected: state.selected,
        entities: Object.assign({}, state.entities, { [answerQuestion.id]: answerQuestion })
      };

    case QuestionActionTypes.ADD_COMMENT:
      let commentQuestion = state.entities[action.payload.questionId];
      commentQuestion.comments = [...commentQuestion.comments, action.payload.id];
      return {
        selected: state.selected,
        entities: Object.assign({}, state.entities, { [commentQuestion.id]: commentQuestion })
      };


    default:
      return state;
  }
}

export function getQuestions(questionIds: number[], questions: Dict<NormQuestion>): NormQuestion[] {
  return questionIds.map(id => questions[id])
}
