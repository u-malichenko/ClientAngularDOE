import {Pipe, PipeTransform} from '@angular/core';
import {Event} from '../../shared/interfaces';

@Pipe({
  name: 'searchPosts'
})
export class SearchPipe implements PipeTransform {
  transform(events: Event[], search = ''): Event[] {
    if (!search.trim()) {
      return events
    }

    return events.filter(event => {
      return event.title.toLowerCase().includes(search.toLowerCase())
    })
  }

}
