import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventsService} from '../../../shared/events.service';
import {AlertService} from '../../../../shared/alert.service';
import {Event, Exp} from '../../../../shared/interfaces';
import {ExtsService} from '../../../shared/exts.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-create-exp-page',
    templateUrl: './create-exp-page.component.html',
    styleUrls: ['./create-exp-page.component.scss']
})
export class CreateExpPageComponent implements OnInit {
    form: FormGroup;
    event: Event;
    exp: Exp;

    constructor(
        private eventsService: EventsService,
        private extsService: ExtsService,
        private route: ActivatedRoute,
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
            }
        );

        this.form = new FormGroup({
            buyer: new FormControl(null, Validators.required),
            comment: new FormControl(null, Validators.required),
            expenseDate: new FormControl(null, Validators.required),
            totalExpenseSum: new FormControl(null, [Validators.required, Validators.pattern(/^[.\d]+$/)]),
            newDirectUser: new FormControl(null, Validators.required),
            newDirectUserSum: new FormControl(null, [Validators.required, Validators.pattern(/^[.\d]+$/)]),
            newPartitialUser: new FormControl(null, Validators.required),
            newPartitialUserPart: new FormControl(null, [Validators.required, Validators.pattern(/^[.\d]+$/)])
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        const exp: Exp = {
            buyer: this.form.value.buyer,
            comment: this.form.value.comment,
            event: this.event.title,
            expenseDate: new Date(this.form.value.date),
            totalExpenseSum: this.form.value.totalExpenseSum
            // ,
            // directPayerMap: this.exp.directPayerMap,
            // partitialPayerMap: this.exp.partitialPayerMap
        };

        this.extsService.create(exp).subscribe(() => {
            this.form.reset();
            this.alert.success('Новая трата успешно добавлена.');
        });
    }

    removeUser(eventUser: string) {
        this.event.eventUserList.splice(this.event.eventUserList.indexOf(eventUser), 1);
        console.log(this.event.eventUserList);
        console.log(this.event);

    }

    addUser(newDirectUser: string, newDirectUserSum: string) {
        this.form.get('newDirectUser').reset();
        this.form.get('newDirectUserSum').reset();
        // this.exp.directPayerMap.push(newDirectUser, newDirectUserSum);
    }
}
