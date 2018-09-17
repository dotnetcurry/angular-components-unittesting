import { Component, OnInit } from '@angular/core';
import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'places',
  template: `
  Select a place:
  <select [(ngModel)]="selectedPlace">
    <option *ngFor="let place of places" [ngValue]="place">{{place.name}}</option>
  </select>
  <br />
  <br />
  <place [selectedPlace]="selectedPlace" (toggleVisited)="toggleVisited($event)"></place>`
})
export class PlacesComponent implements OnInit {
  places: Place[];
  selectedPlace: Place;

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.places;

    this.selectedPlace = this.places[0];
  }

  toggleVisited(name: string) {
    this.placesService.toggleVisited(name);
  }
}
