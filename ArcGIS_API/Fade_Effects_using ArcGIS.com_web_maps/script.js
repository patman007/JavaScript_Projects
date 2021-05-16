require([
    "dojo/ready",
    "dojo/on",
    "dojo/dom",
    "dijit/registry",
    "dojo/dom-construct",
    "dojo/parser",
    "dijit/layout/BorderContainer",
    "dijit/layout/ContentPane",
    "esri/map",
    "esri/arcgis/utils",
    "esri/domUtils",
    "dojo/fx",
    "dojo/_base/fx"
], function (
    ready,
    on,
    dom,
    registry,
    domConstruct,
    parser,
    BorderContainer,
    ContentPane,
    Map,
    arcgisUtils,
    domUtils,
    coreFx,
    baseFx
) {
    ready(function () {

        parser.parse();
        var currentMap, previousMap, counter = -1, webmaps = [
            "d94dcdbe78e141c2b2d3a91d5ca8b9c9", // national geographic basemap
            "d802f08316e84c6592ef681c50178f17", // imagery
            "8503885016cf4a8d96994266cd6def20", // topo
            "7fab8e930c324dd1a5e3effc9c48ac56" // streets
        ];

        on(dom.byId("show_next"), "click", nextMap);
        loadNext();

        function loadNext(map) {
            //create the content pane for the map
            var mapPane = new ContentPane({
                "content": "",
                "id": "map" + (++counter),
                "region": "center"
            }, domConstruct.create("div"));

            //add the newly constructed content pane to the page
            registry.byId("mainWindow").addChild(mapPane);

            var deferred;
            if (map && map.hasOwnProperty("extent")) {
                deferred = arcgisUtils.createMap((webmaps[counter % webmaps.length]), mapPane.domNode.id, {
                    mapOptions: {
                        extent: map.extent
                    }
                });
            } else {
                deferred = arcgisUtils.createMap((webmaps[counter % webmaps.length]), mapPane.domNode.id);
            }
            deferred.then(function (response) {
                dom.byId("current_map").innerHTML = response.itemInfo.item.title;
                fadeMap(response.map);
            });
        }

        function fadeMap(map) {
            currentMap = map;

            if (currentMap.loaded) {
                if (previousMap) {
                    // References:
                    // http://dojotoolkit.org/documentation/tutorials/1.6/effects/
                    // http://dojotoolkit.org/documentation/tutorials/1.6/animation/
                    var combinedAnim = coreFx.combine([
                        baseFx.fadeIn({
                            node: currentMap.container,
                            duration: 1000
                        }),
                        baseFx.fadeOut({
                            node: previousMap.container,
                            duration: 1000,
                            onEnd: removePrevious
                        })
                    ]);
                    combinedAnim.play();
                } else {
                    baseFx.fadeIn({ node: currentMap.container }).play();
                }
            } else {
                // handle map onLoad from webmap
                map.on("load", function () {
                    fadeMap(map);
                });
            }
        }

        function removePrevious() {
            previousMap.destroy();
            domConstruct.destroy(previousMap.container);
        }

        function nextMap() {
            if (currentMap) {
                previousMap = currentMap;
                loadNext(currentMap);
            }
        }
    });
});
