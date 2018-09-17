import { TestBed, async } from '@angular/core/testing';  // 1
import { AppComponent } from './app.component'; // 2
describe('AppComponent', () => {
  beforeEach(async(() => { // 3
    TestBed.configureTestingModule({ // 4
      declarations: [
        AppComponent
      ],
    }).compileComponents(); // 5
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'visitingplaces'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('visitingplaces');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to visitingplaces!');
  }));
});
