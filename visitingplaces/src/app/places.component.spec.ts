import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component, Output, Input, EventEmitter } from '@angular/core';

import { PlacesComponent } from './places.component';
import { PlacesService } from './places.service';
import { Place } from './place.model';

@Component({
  selector: 'place',
  template: '<div></div>'
})
class MockPlaceComponent {
  @Input('selectedPlace')
  place: Place;

  @Output('toggleVisited')
  toggleVisited = new EventEmitter<string>();
}

describe('PlacesComponent tests', () => {
  let fixture: ComponentFixture<PlacesComponent>,
    service: PlacesService;
  let mockService;

  beforeEach(() => {
    mockService = {
      places: [{
        name: 'Charminar',
        city: 'Hyd',
        country: 'India',
        isVisited: true,
        rating: 4
      },
      {
        name: 'Taj Mahal',
        city: 'Agra',
        country: 'India',
        isVisited: false,
        rating: 3
      }],
      toggleVisited: jasmine.createSpy('toggleVisited')
    };
    
    fixture = TestBed.configureTestingModule({
        declarations: [PlacesComponent, MockPlaceComponent],
        providers: [{ provide: PlacesService, useValue: mockService }],
        schemas: [NO_ERRORS_SCHEMA]
      })
      .createComponent(PlacesComponent);
    service = fixture.componentRef.injector.get(PlacesService); //getting instance of the service
    fixture.detectChanges();
  });

  it('should have select box populated with all places', () => {
    expect(fixture.debugElement.queryAll(By.css('option')).length).toEqual(2);
  });

  it('should have assigned the selected date to place component', () => {
    let placeDebugElement = fixture.debugElement.query(By.css('place'));
    let place = placeDebugElement.componentInstance.place;

    expect(place.name).toEqual('Charminar');
  });

  it('should have assigned the selected date to place component when the selection changes', () => {
    fixture.componentInstance.selectedPlace = mockService.places[1];

    fixture.detectChanges();
    let placeDebugElement = fixture.debugElement.query(By.css('place'));
    let place = placeDebugElement.componentInstance.place;

    expect(place.name).toEqual('Taj Mahal');
  });

  it('should call the toggle method in the service', () => {
    fixture.componentInstance.toggleVisited('some name');
    expect(mockService.toggleVisited).toHaveBeenCalledWith('some name');
  });
});
