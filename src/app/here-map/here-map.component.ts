import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';

declare var H: any;

@Component({
  selector: 'app-here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('map', { static: false }) public mapElement: ElementRef;
  @Input() public appId: string;
  @Input() public appCode: string;
  @Input() public latitude: string;
  @Input() public longitude: string;
  @Input() public width: string;
  @Input() public height: string;
  @Output() public centerLocationEvent: EventEmitter<any>;
  private platform: any;
  private map: any;
  private ui: any;
  private search: any;
  public currentGeolocation: any;

  public constructor() {
    this.centerLocationEvent = new EventEmitter<any>();
  }

  public ngOnInit() {
    this.platform = new H.service.Platform({
      app_id: this.appId,
      app_code: this.appCode
    });
    this.search = new H.places.Search(this.platform.getPlacesService());
  }

  public ngAfterViewInit() {
    const defaultLayers = this.platform.createDefaultLayers();
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.normal.map,
      {
        zoom: 15,
        center: { lat: this.latitude, lng: this.longitude }
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map));
    this.ui = H.ui.UI.createDefault(this.map, defaultLayers);
  }

  public ngAfterViewChecked() {
    this.currentGeolocation = this.getCenter();
    this.getCurrentGeolocation();
  }

  public places(query: string) {
    this.map.removeObjects(this.map.getObjects());
    this.search.request({ q: query, at: this.latitude + ',' + this.longitude }, {}, data => {
      for (const dataResults of data.results.items) {
        this.dropMarker({
          lat: dataResults.position[0],
          lng: dataResults.position[1]
        }, dataResults);
      }
    }, error => {
      console.error(error);
    });
  }

  public getCenter() {
    this.map.removeObjects(this.map.getObjects());
    const circleMarker = new H.map.Marker(this.map.getCenter());
    this.map.addObject(circleMarker);
    return this.map.getCenter();
  }

  private dropMarker(coordinates: any, data: any) {
    const marker = new H.map.DomMarker(coordinates);
    marker.setData('<p>' + data.title + '<br>' + data.vicinity + '</p>');
    marker.addEventListener('tap', event => {
      const bubble = new H.ui.InfoBubble(event.target.getPosition(), {
        content: event.target.getData()
      });
      this.ui.addBubble(bubble);
    }, false);
    this.map.addObject(marker);
  }

  getCurrentGeolocation() {
    this.centerLocationEvent.emit(this.currentGeolocation);
  }
}
