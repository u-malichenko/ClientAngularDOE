import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../shared/interfaces';
import {AuthService} from '../shared/services/auth.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

    form: FormGroup;
    submitted = false;
    message: string;

    constructor(
        public auth: AuthService,
        private router: Router,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.queryParams.subscribe((params: Params) => {
            if (params['loginAgain']) {
                this.message = 'Время сесии истекло. Пожалуйста, введите данные повторно';
            } else if (params['authFailed']) {
                this.message = 'Пожалуйста. Введите данные заного';
            }
        });

        this.form = new FormGroup({
            username: new FormControl(null, [
                Validators.required
            ]),
            password: new FormControl(null, [
                Validators.required
            ])
        });
    }

    submit() {
        if (this.form.invalid) {
            return;
        }

        this.submitted = true;

        const user: User = {
            username: this.form.value.username,
            // email: this.form.value.email,
            password: this.form.value.password
        };

        this.auth.login(user).subscribe(() => {
            this.form.reset();
            this.router.navigate(['/user', 'dashboard']);
            this.submitted = false;
        }, () => {
            this.submitted = false;
        });
    }
}

