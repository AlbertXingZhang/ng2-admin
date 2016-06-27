export default function EsriLoader(modules, callback) {
    (<any>window).require(modules, callback);
}
