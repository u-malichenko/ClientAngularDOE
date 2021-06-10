import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {Event, Exp} from '../../../../shared/interfaces';
import {AlertService} from '../../../../shared/alert.service';
import {ExtsService} from '../../../shared/exts.service';
import {ActivatedRoute, Params} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {EventsService} from '../../../shared/events.service';

@Component({
    selector: 'app-dashboard-exp-page',
    templateUrl: './dashboard-exp-page.component.html',
    styleUrls: ['./dashboard-exp-page.component.scss']
})
export class DashboardExpPageComponent implements OnInit, OnDestroy {

    event: Event;
    exps: Exp[] = [];
    eSub: Subscription;
    dSub: Subscription;
    searchStr = '';

    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private extsService: ExtsService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    console.log('params.id ', params.id);
                    return this.eventsService.getById(params.id);
                })
            ).subscribe((event: Event) => {
            this.event = event;
            console.log('this.event ', this.event);
            this.eSub = this.extsService.getAll(this.event.id).subscribe(exps => {
                this.exps = exps;
                console.log('this.exp[] ', this.exps);
            });
        });


    }

    remove(id: string) {
        this.dSub = this.extsService.remove(id).subscribe(() => {
            this.exps = this.exps.filter(exp => exp.id !== id);
            this.alert.warning('exp был удален');
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
