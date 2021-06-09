import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Event} from '../../../shared/interfaces';
import {EventsService} from '../../shared/events.service';
import {AlertService} from '../../../shared/alert.service';


@Component({
    selector: 'app-create-page',
    templateUrl: './create-event-page.component.html',
    styleUrls: ['./create-event-page.component.scss']
})
export class CreateEventPageComponent implements OnInit {

    form: FormGroup;

    constructor(
        private eventsService: EventsService,
        private alert: AlertService
    ) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl(null, Validators.required),
            date: new FormControl(null, Validators.required),
            description: new FormControl(null)
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        const event: Event = {
            title: this.form.value.title,
            date: new Date(this.form.value.date),
            description: this.form.value.description
        };

        this.eventsService.create(event).subscribe(() => {
            this.form.reset();
            this.alert.success('Новое событие было успешно создано.');
        });
    }

}
