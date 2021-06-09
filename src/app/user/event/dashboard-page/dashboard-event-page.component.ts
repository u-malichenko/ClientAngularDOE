import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventsService} from '../../shared/events.service';
import {Event} from '../../../shared/interfaces';
import {Subscription} from 'rxjs';
import {AlertService} from '../../../shared/alert.service';

@Component({
    selector: 'app-dashboard-page',
    templateUrl: './dashboard-event-page.component.html',
    styleUrls: ['./dashboard-event-page.component.scss']
})
export class DashboardEventPageComponent implements OnInit, OnDestroy {

    events: Event[] = [];
    eSub: Subscription;
    dSub: Subscription;
    searchStr = '';

    constructor(
        private eventsService: EventsService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.eSub = this.eventsService.getAll().subscribe(posts => {
            this.events = posts;
            console.log(this.events);
        });

    }

    remove(id: string) {
        this.dSub = this.eventsService.remove(id).subscribe(() => {
            this.events = this.events.filter(event => event.id !== id);
            this.alert.warning('event был удален');
        });
    }

    ngOnDestroy() {
        if (this.eSub) {
            this.eSub.unsubscribe();
        }

        if (this.dSub) {
            this.dSub.unsubscribe();
        }
    }

}
