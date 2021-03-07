require(["esri/Map", "esri/layers/GeoJSONLayer", "esri/views/MapView"], function (
  Map,
  GeoJSONLayer,
  MapView
) {
  // If GeoJSON files are not on the same domain as your website, a CORS enabled server
  // or a proxy is required.
  const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

  const template = {
    title: "Earthquake Info",
    content: "Magnitude {mag} {type} hit {place} on {time}",
    fieldInfos: [
      {
        fieldName: 'time',
        format: {
          dateFormat: 'short-date-short-time'
        }
      }
    ]
  };

  const renderer = {
    type: "simple",
    field: "mag",
    symbol: {
      type: "simple-marker",
      color: "orange",
      outline: {
        color: "white"
      }
    },
    visualVariables: [{
      type: "size",
      field: "mag",
      stops: [{
          value: 2.5,
          size: "4px"
        },
        {
          value: 8,
          size: "40px"
        }
      ]
    }]
  };

  //Geojson layer with USGS url
  const geojsonLayer = new GeoJSONLayer({
    url: url,
    copyright: "USGS Earthquakes",
    popupTemplate: template,
    renderer: renderer //optional
  });

  //Map with GeoJSON Layer
  const map = new Map({
    basemap: "gray-vector",
    layers: [geojsonLayer]
  });

  //View centered on US
  const view = new MapView({
    container: "viewDiv",
    center: [-168, 46],
    zoom: 4,
    map: map,
    center: [-95.713, 37.890]
  });
});