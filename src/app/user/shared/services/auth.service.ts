import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthResponse, Token, User} from '../../../shared/interfaces';
import {Observable, Subject, throwError} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

    public error$: Subject<string> = new Subject<string>();
    constructor(private http: HttpClient) {
    }

    get token(): string {
        const expDate = new Date(localStorage.getItem('tokenExpDate'));
        if (new Date() > expDate) {
            this.logout();
            return null;
        }
        return localStorage.getItem('token');
    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`${environment.API_ENDPOINT}/auth`, user)
            .pipe(
                tap(
                    this.setToken
                ),
                catchError(this.handleError.bind(this))
            );
    }

    logout() {
        this.setToken(null);
        localStorage.clear();
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    private handleError(error: HttpErrorResponse) {
        const {message} = error.error.error;
        console.log('handleError', error);

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Неверный email');
                break;
            case 'INVALID_PASSWORD':
                this.error$.next('Неверный пароль');
                break;
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Такого email нет');
                break;
        }

        return throwError(error);
    }

    private setToken(response: AuthResponse | null) {
        if (response) {
            const jsonToken: Token = JSON.parse(atob(response.token.split('.')[1]));
            localStorage.setItem('tokenExpDate', new Date(+ +jsonToken.exp * 1000).toString());
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', jsonToken.sub);
            console.log(response);
        } else {
            localStorage.clear();
        }
    }
}
