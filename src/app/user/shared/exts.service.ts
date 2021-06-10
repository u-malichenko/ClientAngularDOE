import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Exp} from '../../shared/interfaces';

import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class ExtsService {
    constructor(private http: HttpClient) {
    }

    create(exp: Exp) {
        console.log('create(exp: Exp): ', exp);
        return this.http.post(`${environment.API_ENDPOINT}/api/v1/expense`, exp);
    }

    getAll(id: string): Observable<Exp[]> {
        console.log('http.get Exp (`${environment.API_ENDPOINT}/api/v1/expense/ByEventId/${id} ');
        const r: Observable<Exp[]> = this.http.get<Exp[]>(`${environment.API_ENDPOINT}/api/v1/expense/ByEventId/${id}`)
            .pipe(map((response) => response));
        console.log(r.toPromise());
        return r;

    }

    getById(id: string): Observable<Exp> {
        console.log('http.get Exp (`${environment.API_ENDPOINT}/api/v1/expense/${id} ', id);
        const r: Observable<Exp> = this.http.get<Exp>(`${environment.API_ENDPOINT}/api/v1/expense/${id}`)
            .pipe(
                map((exp: Exp) => exp));
        console.log(r.toPromise());
        return r;
    }


    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.API_ENDPOINT}/api/v1/expense/${id}`);
    }

    update(exp: Exp): Observable<Exp> {
        console.log('http.patch Exp (${environment.API_ENDPOINT}/api/v1/expense, exp )', exp);
        return this.http.patch<Exp>(`${environment.API_ENDPOINT}/api/v1/expense`, exp);
    }
}
