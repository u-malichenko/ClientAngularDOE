import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DirectPayer, Event, Exp, PartitialPayer} from '../../../../shared/interfaces';
import {EventsService} from '../../../shared/events.service';
import {ExpsService} from '../../../shared/exps.service';
import {ActivatedRoute, Params} from '@angular/router';
import {AlertService} from '../../../../shared/alert.service';
import {switchMap} from 'rxjs/operators';

@Component({
    selector: 'app-edit-exp-page',
    templateUrl: './edit-exp-page.component.html',
    styleUrls: ['./edit-exp-page.component.scss']
})
export class EditExpPageComponent implements OnInit {


    form: FormGroup;
    event: Event;
    exp: Exp;

    directPayerMap: DirectPayer[] = [];
    directPayer: DirectPayer;

    partitialPayerMap: PartitialPayer[] = [];
    partitialPayer: PartitialPayer;


    constructor(
        private eventsService: EventsService,
        private expsService: ExpsService,
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

        this.route.params
            .pipe(
                switchMap((params: Params) => {
                    console.log('params.expid ', params.expid);
                    return this.expsService.getById(params.expid);
                })
            ).subscribe((exp: Exp) => {
                this.exp = exp;
                this.directPayerMap = exp.directPayerMap;
                this.partitialPayerMap = exp.partitialPayerMap;
            }
        );


        this.form = new FormGroup({
            buyer: new FormControl(this.exp.buyer, Validators.required),
            comment: new FormControl(this.exp.comment, Validators.required),
            expenseDate: new FormControl(this.exp.expenseDate, Validators.required),
            totalExpenseSum: new FormControl(this.exp.totalExpenseSum, [Validators.required, Validators.pattern(/^[.\d]+$/)]),
            newDirectUser: new FormControl(null, Validators.required),
            newDirectSum: new FormControl(null, [Validators.required, Validators.pattern(/^[.\d]+$/)]),
            newPartitialUser: new FormControl(null, Validators.required),
            newPartitialPart: new FormControl(null, [Validators.required, Validators.pattern(/^[.\d]+$/)])
        });
    }

    submit() {
        if (this.form.get('buyer').invalid
            || this.form.get('comment').invalid
            || this.form.get('expenseDate').invalid
            || this.form.get('totalExpenseSum').invalid) {
            console.log('submit invalid');
            return;
        }

        const exp: Exp = {
            buyer: this.form.value.buyer,
            comment: this.form.value.comment,
            event: this.event.title,
            expenseDate: new Date(this.form.value.date),
            totalExpenseSum: this.form.value.totalExpenseSum,
            directPayerMap: this.directPayerMap,
            partitialPayerMap: this.partitialPayerMap
        };
        console.log('submit().create(exp)', exp);
        this.expsService.update(exp).subscribe(() => {
            this.form.reset();
            this.alert.success('Трата успешно отредактирована.');
        });
    }

    removeDirectUser(directPayer: DirectPayer) {
        this.directPayerMap.splice(this.directPayerMap.indexOf(directPayer), 1);
        console.log(this.partitialPayerMap);
    }

    removePartitialUser(partitialPayer: PartitialPayer) {
        this.partitialPayerMap.splice(this.partitialPayerMap.indexOf(partitialPayer), 1);
        console.log(this.partitialPayerMap);
    }

    addDirectUser(newDirectUser: string, newDirectSum: string) {
        const directPayer: DirectPayer = {
            userName: newDirectUser,
            sum: newDirectSum
        };
        console.log(directPayer);
        this.directPayerMap.push(directPayer);
        this.form.get('newDirectUser').reset();
        this.form.get('newDirectSum').reset();

    }

    addPartitialUser(newPartitialUser: string, newPartitialPart: string) {
        const partitialPayer: PartitialPayer = {
            userName: newPartitialUser,
            cof: newPartitialPart
        };
        console.log(partitialPayer);
        this.partitialPayerMap.push(partitialPayer);
        this.form.get('newPartitialUser').reset();
        this.form.get('newPartitialPart').reset();
    }

}
