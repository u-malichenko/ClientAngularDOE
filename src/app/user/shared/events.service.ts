import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from '../../shared/interfaces';

import {map} from 'rxjs/operators';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class EventsService {
    constructor(private http: HttpClient) {
    }

    create(event: Event) {
        console.log('create(event: Event): ', event);
        // const r: Observable<Event> =
        return this.http.post(`${environment.API_ENDPOINT}/api/v1/event`, event);
        //     .pipe(map((response: Event) => {
        //         return {
        //             ...event,
        //             id: response.id
        //         };
        //     }));
        // console.log(r.toPromise());
        // return r;
    }

    getAll(): Observable<Event[]> {
        console.log('http.get Event (`${environment.API_ENDPOINT}/api/v1/event ');
        const r: Observable<Event[]> = this.http.get<Event[]>(`${environment.API_ENDPOINT}/api/v1/event`)
            .pipe(map((response) => response));
        console.log(r.toPromise());
        return r;

    }

    getById(id: string): Observable<Event> {
        console.log('http.get Event (`${environment.API_ENDPOINT}/api/v1/event/${id} ', id);
        const r: Observable<Event> = this.http.get<Event>(`${environment.API_ENDPOINT}/api/v1/event/${id}`)
            .pipe(
                map((event: Event) => event));
        console.log(r.toPromise());
        return r;
    }


    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.API_ENDPOINT}/api/v1/event/${id}`);
    }

    update(event: Event): Observable<Event> {
        console.log('http.patch Event (${environment.API_ENDPOINT}/api/v1/event, event)', event);
        return this.http.patch<Event>(`${environment.API_ENDPOINT}/api/v1/event`, event);
    }
}
