import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from './interfaces';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EventsService {
  constructor(private http: HttpClient) {}

  create(event: Event): Observable<Event> {
    return this.http.post(`${environment.API_ENDPOINT}/posts.json`, event)
      .pipe(map((response: Event) => {
        return {
          ...event,
          id: response.id,
          date: new Date(event.date)
        }
      }))
  }

  getAll(): Observable<Event[]> {
    return this.http.get(`${environment.API_ENDPOINT}/posts.json`)
      .pipe(map((response: {[key: string]: any}) => {
        return Object
          .keys(response)
          .map(key => ({
            ...response[key],
            id: key,
            date: new Date(response[key].date)
          }))
      }))
  }

  getById(id: string): Observable<Event> {
    return this.http.get<Event>(`${environment.API_ENDPOINT}/posts/${id}.json`)
      .pipe(map((event: Event) => {
        return {
          ...event, id,
          date: new Date(event.date)
        }
      }))
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.API_ENDPOINT}/posts/${id}.json`)
  }

  update(event: Event): Observable<Event> {
    return this.http.patch<Event>(`${environment.API_ENDPOINT}/posts/${event.id}.json`, event)
  }
}
