import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {EventsService} from '../../shared/events.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Event} from '../../../shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription, throwError} from 'rxjs';
import {AlertService} from '../../../shared/alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
    selector: 'app-edit-page',
    templateUrl: './edit-event-page.component.html',
    styleUrls: ['./edit-event-page.component.scss']
})
export class EditEventPageComponent implements OnInit, OnDestroy {

    form: FormGroup;
    event: Event;
    submitted = false;

    uSub: Subscription;

    constructor(
        private route: ActivatedRoute,
        private eventsService: EventsService,
        private alert: AlertService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.route.params.pipe(
            switchMap((params: Params) => {
                return this.eventsService.getById(params.id);
            })
        ).subscribe((event: Event) => {
            this.event = event;
            this.form = new FormGroup({
                title: new FormControl(event.title, Validators.required),
                date: new FormControl(event.date, Validators.required),
                description: new FormControl(event.description),
                eventUserList: new FormControl(event.eventUserList),
                newEventUser: new FormControl()
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
            title: this.form.value.title,
            description: this.form.value.description,
            eventUserList: this.form.value.eventUserList
        }).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    this.alert.danger(`имя пользователя не существует, изменения не сохранены. ${error.message.toString()}`);
                }
                this.submitted = false;
                return throwError(error);
            })
        ).subscribe(() => {
            this.submitted = false;
            this.alert.success('event был обновлен');
            this.router.navigate(['/user', 'dashboard']);
        });
    }

    removeUser(eventUser: string) {
        this.event.eventUserList.splice(this.event.eventUserList.indexOf(eventUser), 1);
        console.log(this.event.eventUserList);
        console.log(this.event);

    }

    addUser(eventUser: string) {
        this.form.get('newEventUser').reset();
        this.event.eventUserList.push(eventUser);
    }
}
