import { Action } from '@ngrx/store';
import { Paper } from '../models/paper';
import { PaperActionTypes } from './paper.actions';
import { Dict } from '../models/dict';
import { normalize, Schema, arrayOf } from 'normalizr';
import { CoursesState } from '../courses.store';

export interface PaperState {
  entities: Dict<Paper>;
  selectedId: number;
}

const initalState: PaperState = {
  entities: {},
  selectedId: null
};

export function paperReducer(state = initalState, action: Action): PaperState {
  switch (action.type) {
    case PaperActionTypes.LOAD_SUCCESS:
    case PaperActionTypes.ADD_SUCCESS:
      return {
        selectedId: state.selectedId,
        entities: Object.assign({}, state.entities, action.payload)
      };

    case PaperActionTypes.SELECT_SUCCESS:
      return {
        selectedId: action.payload,
        entities: state.entities
      };

    case PaperActionTypes.DESELECT:
      return {
        selectedId: null,
        entities: state.entities
      };

    default:
      return state;
  }
}
const paperSchema = new Schema('papers');
const serverSchema = arrayOf(paperSchema);


export function normalizePapers(papers: Paper[]): Dict<Paper> {
  return normalize(papers, serverSchema).entities.papers
}

export function denormalizePapers(papers: Dict<Paper>): Paper[]{
  return Object.keys(papers).map(key => papers[key])
}

export function getSelectedPaper(state: PaperState): Paper{
  return state.entities[state.selectedId]
}

export function getPapersSelectedByCourse(state: CoursesState){
  return Object.keys(state.paper.entities)
    .filter(key => state.paper.entities[key].courseId == state.course.selectedId)
    .map(key => state.paper.entities[key])
}
