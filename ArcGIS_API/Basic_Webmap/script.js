require(["esri/Map", "esri/views/MapView"], function (Map, MapView) {
      //2D BaseMap
      const map = new Map({
        basemap: "arcgis-topographic",
      });

      //USA centered
      const view = new MapView({
        container: "viewDiv",
        map: map,
        zoom: 5,
        center: [-95.713, 37.890]
      });
});
