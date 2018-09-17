import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PlaceComponent } from './place.component';
import { PlacesComponent } from './places.component';

@NgModule({
  declarations: [
    PlaceComponent,
    PlacesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [PlacesComponent]
})
export class AppModule { }
