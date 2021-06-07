import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventsService} from '../shared/events.service';
import {switchMap} from 'rxjs/operators';
import {Event} from '../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AlertService} from '../shared/services/alert.service';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-page.component.html',
    styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    event: Event;
    submitted = false;

    uSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.eventsService.getById(params['id']);
            })
        ).subscribe((event: Event) => {
            this.event = event;
            this.form = new FormGroup({
                title: new FormControl(event.title, Validators.required),
                date: new FormControl(event.date, Validators.required)
            });
        });
    }

    ngOnDestroy() {
        if (this.uSub) {
            this.uSub.unsubscribe();
        }
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        this.uSub = this.eventsService.update({
            ...this.event,
            date: this.form.value.date,
            title: this.form.value.title
        }).subscribe(() => {
            this.submitted = false;
            this.alert.success('event был обновлен');
        });
    }
}
