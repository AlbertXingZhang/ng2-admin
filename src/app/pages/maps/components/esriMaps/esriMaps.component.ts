import {Component, ElementRef} from '@angular/core';
import {MapController} from "./MapController";

@Component({
  selector: 'esri-maps',
  styles: [require('./esriMaps.scss')],
  template: require('./esriMaps.html'),
})
export class EsriMaps {

  constructor(private _elementRef:ElementRef) {
  }

  ngAfterViewInit() {
    var mapController = new MapController("mapDiv");
    mapController.start();
  }
}
