import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Place } from './place.model';

@Component({
  selector: 'place',
  templateUrl: './place.component.html',
  styles: [`
  .place-name {
  	font-weight: bold;
  	font-style: italic;
  }
  .visited-place {
  	background-color: azure;
  }
  .place-changed {
  	background-color: palegreen;
  }
  :host {
  	display: block;
  }
  `]
})
export class PlaceComponent {

  @Input('selectedPlace')
  place: Place;
  placeChanged: string;

  @Output('toggleVisited')
  toggleVisited = new EventEmitter<string>();

  togglePlaceVisited() {
    this.toggleVisited.emit(this.place.name);
  }

  get IsVisited(): string {
    return this.place.isVisited? 'Yes' : 'No';
  }
}
