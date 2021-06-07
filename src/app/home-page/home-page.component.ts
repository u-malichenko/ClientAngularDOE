import {Component, OnInit} from '@angular/core';
import {EventsService} from '../shared/events.service';
import {Observable} from 'rxjs';
import {Event} from '../shared/interfaces';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  events$: Observable<Event[]>

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
    this.events$ = this.eventsService.getAll()
  }

}
