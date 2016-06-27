import EsriLoader from "./esriMaps.loader";

export class MapController {
    map: any;
    view: any;

    constructor(public mapDiv: string) {
    }

    start() {

        EsriLoader([
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/BasemapToggle"
        ], (Map, MapView, BasemapToggle) => {

                // Create the Map with an initial basemap
                this.map = new Map({
                    basemap: "topo"
                });

                // Create the MapView and reference the Map in the instance
                this.view = new MapView({
                    container: this.mapDiv,
                    map: this.map,
                    center: [-86.049, 38.485],
                    zoom: 3
                });

                // 1 - Create the widget
                var toggle = new BasemapToggle({
                    // 2 - Set properties
                    view: this.view, // view that provides access to the map's 'topo' basemap
                    nextBasemap: "hybrid" // allows for toggling to the 'hybrid' basemap
                });
                // 3 - Call startup on the widget
                toggle.startup();

                // Add the BasemapToggle widget to the top right corner of the view
                this.view.ui.add(toggle, "top-right");
            });

    }
}
