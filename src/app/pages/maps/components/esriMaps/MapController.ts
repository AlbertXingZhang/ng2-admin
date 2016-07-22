import EsriMapsLoader from "./esriMaps.loader";

export class MapController {
    map: any;
    view: any;

    constructor(public mapDiv: string) {
    }

    start() {

        EsriMapsLoader([
            "esri/Map",
            "esri/views/SceneView"
        ], (Map, SceneView) => {
            this.map = new Map({
                basemap: "streets",
                ground: "world-elevation"
            });
            this.view = new SceneView({
                container: this.mapDiv,   // Reference to the scene div created in step 5
                map: this.map,            // Reference to the map object created before the scene
                scale: 50000000,          // Sets the initial scale to 1:50,000,000
                center: [-101.17, 21.78]  // Sets the center point of view with lon/lat
            });
        });

    }
}
