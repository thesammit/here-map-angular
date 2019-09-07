import { Component, OnInit } from '@angular/core';
import * as appProperties from './app-properties';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HERE Map with Angular';
  public cred = appProperties.CREDENTIALS;
  public query: string;
  public center: any;

  public constructor() {
    this.query = 'starbucks';
  }

  public ngOnInit() { }

  public showCurrentLocation(centerLoc: any) {
    this.center = centerLoc;
  }

  public currentLocation() {
    if (this.center) {
      return `Current location: ${this.center.lat}, ${this.center.lng}`;
    } else {
      return `Current location: Not Available`;
    }
  }
}
