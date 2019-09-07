import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HereMapComponent } from './here-map/here-map.component';
import { GeolocationComponent } from './geolocation/geolocation.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    HereMapComponent,
    GeolocationComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
