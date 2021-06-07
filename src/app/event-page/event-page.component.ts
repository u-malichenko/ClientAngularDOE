import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../shared/events.service';
import {Observable} from 'rxjs';
import {Event} from '../shared/interfaces';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {

  event$: Observable<Event>

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService
  ) {
  }

  ngOnInit() {
    this.event$ = this.route.params
      .pipe(switchMap((params: Params) => {
        return this.eventsService.getById(params['id'])
      }))
  }

}
