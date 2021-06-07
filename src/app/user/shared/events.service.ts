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

    create(event: Event): Observable<Event> {
        return this.http.post(`${environment.API_ENDPOINT}/posts.json`, event)
            .pipe(map((response: Event) => {
                return {
                    ...event,
                    id: response.id,
                    date: new Date(event.date)
                };
            }));
    }

    // getAll(): Observable<Event[]> {
    //     console.log('http.get(`${environment.API_ENDPOINT}/api/v1/event`');
    //     return this.http.get(`${environment.API_ENDPOINT}/api/v1/event`)
    //         .pipe(map((response: { [key: string]: any }) => {
    //             return Object
    //                 .keys(response)
    //                 .map(key => ({
    //                     ...response[key],
    //                     id: key,
    //                     date: new Date(response[key].date)
    //                 }));
    //         }));
    // }

    // return this.http.get<AgentDetails>(urls).pipe(map(res => res['List']));

    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(`${environment.API_ENDPOINT}/api/v1/event`)
            .pipe(map((response) => response));
    }

    getById(id: string): Observable<Event> {
        return this.http.get<Event>(`${environment.API_ENDPOINT}/posts/${id}.json`)
            .pipe(map((event: Event) => {
                return {
                    ...event, id,
                    date: new Date(event.date)
                };
            }));
    }


    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.API_ENDPOINT}/posts/${id}.json`);
    }

    update(event: Event): Observable<Event> {
        return this.http.patch<Event>(`${environment.API_ENDPOINT}/posts/${event.id}.json`, event);
    }
}
