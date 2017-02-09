import { Component, ElementRef } from '@angular/core';

@Component({
    selector: 'esri-maps',
    styleUrls: ['./esriMaps.scss'],
    templateUrl: './esriMaps.html',
})
export class EsriMaps {

    constructor(private _elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        let el = this._elementRef.nativeElement.querySelector('.esri-maps');

        (<any>window).require([
            "esri/Map",
            "esri/views/SceneView"
        ], (Map, SceneView) => {
            let map = new Map({
                basemap: "streets",
                ground: "world-elevation"
            });
            let view = new SceneView({
                container: el,            // Reference to the scene div created in step 5
                map: map,                 // Reference to the map object created before the scene
                scale: 50000000,          // Sets the initial scale to 1:50,000,000
                center: [-101.17, 21.78]  // Sets the center point of view with lon/lat
            });
        });
    }
}
