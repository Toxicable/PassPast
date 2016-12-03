import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Storage } from '../../../core/storage';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store';



// declare let $: any;

// interface CommentsHub{
//     client: CommentsHubClient;
//     server: CommentsHubServer;
// }
// interface CommentsHubClient {
//     hello: () => void;
// }
// interface CommentsHubServer {
//     post: (comment: string, questionId: string) => void;
//     leaveGroup: (examId: string) => void;
//     joinGroup: (examId: string) => void;
// }


@Injectable()
export class CommentsHubService {
    //private hub: CommentsHub;
    //public server: CommentsHubServer;
    constructor(private store: Store<AppState>) {}

    init(){
        // return this.store.select( state => state.auth.authTokens.access_token)
        //     .first()
        //     .flatMap(token => {

        //         this.hub = $.connection.commentsHub;
        //         $.connection.hub.logging = true;

        //         this.hub.client.hello = () => console.log("hello");

        //         $.connection.hub.qs = { 'access_token': 'Bearer ' + token };
        //         return Observable.fromPromise($.connection.hub.start())
        //             .first()
        //             .flatMap(() => {

        //                 this.server = this.hub.server;
        //                 return this.store.select(state => state.courses.exam.selected.id)
        //                     .first()
        //                     .map(examId => {

        //                         return this.hub.server.joinGroup(examId.toString());
        //                     });
        //             });
        //     });
    }
}
