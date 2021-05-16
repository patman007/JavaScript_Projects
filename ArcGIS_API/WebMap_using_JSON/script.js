
require([
    "dojo/parser",
    "dojo/ready",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "dojo/dom",
    "esri/map",
    "esri/geometry/Extent",
    "esri/urlUtils",
    "esri/arcgis/utils",
    "esri/dijit/Legend",
    "esri/dijit/Scalebar",
    "dojo/domReady!"
], function (
    parser,
    ready,
    BorderContainer,
    ContentPane,
    dom,
    Map,
    Extent,
    urlUtils,
    arcgisUtils,
    Legend,
    Scalebar
) {
    ready(function () {

        parser.parse();

        var webmap = {};
        webmap.item = {
            "title": "Soil Survey Map of USA",
            "snippet": "This map shows the Soil Survey Geographic (SSURGO) by the United States Department of Agriculture's Natural Resources Conservation Service.",
            "extent": [[-139.4916, 10.7191], [-52.392, 59.5199]]
        };

        webmap.itemData = {
            "operationalLayers": [{
                "url": "https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/Soil_Survey_Map/MapServer",
                "visibility": true,
                "opacity": 0.75,
                "title": "Soil Survey Map",
                "itemId": "204d94c9b1374de9a21574c9efa31164"
            }],
            "baseMap": {
                "baseMapLayers": [{
                    "opacity": 1,
                    "visibility": true,
                    "url": "https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer"
                }, {
                    "isReference": true,
                    "opacity": 1,
                    "visibility": true,
                    "url": "https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer"
                }],
                "title": "World_Terrain_Base"
            },
            "version": "1.1"
        };

        dom.byId("title").innerHTML = webmap.item.title;
        dom.byId("subtitle").innerHTML = webmap.item.snippet;

        arcgisUtils.createMap(webmap, "map").then(function (response) {

            var map = response.map;

            //add the scalebar
            var scalebar = new Scalebar({
                map: map,
                scalebarUnit: "english"
            });

            //add the legend. Note that we use the utility method getLegendLayers to get
            //the layers to display in the legend from the createMap response.
            var legendLayers = arcgisUtils.getLegendLayers(response);
            var legendDijit = new Legend({
                map: map,
                layerInfos: legendLayers
            }, "legend");
            legendDijit.startup();

        });

    });
});

