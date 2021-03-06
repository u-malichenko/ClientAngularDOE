import {Component, Input, OnInit} from '@angular/core';
import {Event} from '../../../../shared/interfaces';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() event: Event

  constructor() { }

  ngOnInit() {
  }

}
