export default function EsriMapsLoader(modules, callback) {
    (<any>window).require(modules, callback);
}
