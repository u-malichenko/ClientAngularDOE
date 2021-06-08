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

    getAll(): Observable<Event[]> {
        return this.http.get<Event[]>(`${environment.API_ENDPOINT}/api/v1/event`)
            .pipe(map((response) => response));
    }

    //    $scope.loadEvent = function () {
    //         console.log('GET '+API_ENDPOINT + '/api/v1/event/' + sharedParam.getEventId())
    //         $http({
    //             url: API_ENDPOINT + '/api/v1/event/' + sharedParam.getEventId(),
    //             method: 'GET'
    //         }).then(function (response) {
    //             console.log(response.data);
    //             $scope.event = response.data;
    //         });
    //     };

    getById(id: string): Observable<Event> {
        console.log('http.get<Event>(`${environment.API_ENDPOINT}/api/v1/event/${id}');
        return this.http.get<Event>(`${environment.API_ENDPOINT}/api/v1/event/${id}`)
            .pipe(
                map((event: Event) => event));
    }


    remove(id: string): Observable<void> {
        return this.http.delete<void>(`${environment.API_ENDPOINT}/posts/${id}.json`);
    }


    //         console.log('updateEvent $http.put '+ API_ENDPOINT + '/api/v1/event/, $scope.event = '+$scope.event.data)


    update(event: Event): Observable<Event> {
        console.log('http.patch Event (${environment.API_ENDPOINT}/api/v1/event, event)', event);
        return this.http.patch<Event>(`${environment.API_ENDPOINT}/api/v1/event`, event);
    }
}
