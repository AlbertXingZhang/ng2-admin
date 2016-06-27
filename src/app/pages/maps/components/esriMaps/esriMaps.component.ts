import {Component, ElementRef} from '@angular/core';
import {BaCard} from '../../../../theme/components';

import {MapController} from "./MapController";

@Component({
  selector: 'esri-maps',
  pipes: [],
  providers: [],
  directives: [BaCard],
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
