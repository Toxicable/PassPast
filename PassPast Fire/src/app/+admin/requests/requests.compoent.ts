import { Request } from './../../models/request';
import { Observable } from 'rxjs/Observable';
import { RequestService } from './../../core/request.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'requests',
  templateUrl: 'requests.compoent.html'
})
export class RequestsComponent implements OnInit{

  requests$: Observable<Request[]>;

  constructor(
    private requests: RequestService,
  ) { }

    ngOnInit(){
      this.requests$ = this.requests.requests$;
    }
}
