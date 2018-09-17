import { NO_ERRORS_SCHEMA, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Place } from './place.model';
import { By } from '@angular/platform-browser';
import { PlaceComponent } from './place.component';

describe('PlaceComponent Tests: As a class', () => {
  let placeComponent: PlaceComponent;

  beforeEach(() => {
    placeComponent = new PlaceComponent();
    placeComponent.place = {
      name: 'Charminar',
      city: 'Hyd',
      country: 'India',
      isVisited: true,
      rating: 4
    };
  });

  it('should return Yes when the place is visited', () => {
    expect(placeComponent.IsVisited).toEqual('Yes');
  });

  it('should return No when the place is not visited', () => {
    placeComponent.place.isVisited = false;
    expect(placeComponent.IsVisited).toEqual('No');
  });

  it('should emit event when toggleVisited is called', () => {
    placeComponent.toggleVisited.subscribe(name => expect(name).toEqual('Charminar'));
    placeComponent.togglePlaceVisited();
  });
});

describe('PlaceComponent Tests: As an independent component', () => {
  let place: Place,
    rootElement: HTMLElement;
  let fixture: ComponentFixture<PlaceComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        declarations: [PlaceComponent]
      })
      .createComponent(PlaceComponent);

    place = {
      name: 'Charminar',
      city: 'Hyd',
      country: 'India',
      isVisited: true,
      rating: 4
    };

    rootElement = fixture.debugElement.query(By.css('.thumbnail')).nativeElement as HTMLElement;
  });

  it('should have initialized the component', () => {
    expect(fixture.componentInstance).toBeDefined();
  });

  it('should have applied the changes when the place set is visited', () => {
    fixture.componentInstance.place = place;
    fixture.detectChanges();

    expect(rootElement.classList).toContain('visited-place');
    expect(rootElement.querySelector("div.caption").textContent)
      .toEqual(place.name);
    expect(rootElement.querySelector('a').textContent).toEqual('Mark Not Visited');
  });

  it('should have applied the changes when the place set is not visited', () => {
    place.isVisited = false;
    fixture.componentInstance.place = place;
    fixture.detectChanges();

    expect(rootElement.classList).not.toContain('visited-place');
    expect(rootElement.querySelector('a').textContent).toEqual('Mark Visited');
  });

  it("should emit the event when the button is clicked", () => {
    fixture.componentInstance.place = place;
    fixture.detectChanges();

    fixture.componentInstance.toggleVisited.subscribe((name) => expect(name).toEqual(place.name));
    rootElement.querySelector('a').click();
  });
});

describe('PlaceComponent Tests: Inside a test host', () => {
  @Component({
    template: `<place [selectedPlace]="selectedPlace" (toggleVisited)="toggleVisited($event)"></place>`
  })
  class TestHostComponent {
    places: Place[] = [{
      name: 'Charminar',
      city: 'Hyderabad',
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
    }];
    selectedPlace: Place;
    placeName: string;

    constructor() {
      this.selectedPlace = this.places[0];
    }

    toggleVisited(name: string) {
      this.placeName = name;
    }
  }

  let rootElement: HTMLElement;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        declarations: [PlaceComponent, TestHostComponent]
      })
      .createComponent(TestHostComponent);

    rootElement = fixture.debugElement.query(By.css('.thumbnail')).nativeElement as HTMLElement;
  });

  it('should have the place component', () => {
    fixture.detectChanges();
    expect(rootElement.querySelector('.caption').textContent).toEqual('Charminar');
  });

  it('should emit name of the place', () => {
    fixture.detectChanges();
    let visitedLink = fixture.debugElement.query(By.css('a')).nativeElement as HTMLElement;
    visitedLink.click();

    expect(fixture.componentInstance.placeName).toEqual(fixture.componentInstance.selectedPlace.name);
  });

  it('should change bindings when place is updated', () => {
    fixture.componentInstance.selectedPlace = fixture.componentInstance.places[1];
    fixture.detectChanges();

    expect(rootElement.querySelector('.caption').textContent).toEqual('Taj Mahal');
  });
});
