import { Action } from '@ngrx/store';
import { type } from '../../utilities/action-name-helper';
import { Injectable } from '@angular/core';



export class LoadingBarActions {
  static types = {
    START: type('[LoadingBar] Start'),
    DONE: type('[LoadingBar] Done')
  };

  static start(): Action {
    return {
      type: this.types.START
    };
  }
  static done(): Action {
    return {
      type: this.types.DONE
    };
  }
}
