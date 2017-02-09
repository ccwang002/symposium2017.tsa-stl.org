new StickyState(document.querySelectorAll('.sticky'));

$('body').scrollspy({ target: '#navbar' });

var iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.transform([-90.262096, 38.634669], 'EPSG:4326', 'EPSG:3857')),
    name: '<strong>McDonnell Science Building</strong><br>Hi',
});
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/v3.20.1/examples/data/icon.png'
    }))
});

iconFeature.setStyle(iconStyle);

var vectorSource = new ol.source.Vector({
    features: [iconFeature]
});

var vectorLayer = new ol.layer.Vector({
    source: vectorSource
});

var rasterLayer = new ol.layer.Tile({
    'source': new ol.source.OSM({
        'url': 'https://c.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
        'attributions': [
            new ol.Attribution({
                'html': 'Maps © <a href="http://www.thunderforest.com">Thunderforest</a>, Data © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
            })
        ]
    }),
});

var map = new ol.Map({
    layers: [rasterLayer, vectorLayer],
    target: document.getElementById('map'),
    view: new ol.View({
        center: ol.proj.transform([-90.262096, 38.634669], 'EPSG:4326', 'EPSG:3857'),
        zoom: 16
    })
});

var element = document.getElementById('popup');

var popup = new ol.Overlay({
    element: element,
    positioning: 'bottom-center',
    stopEvent: false,
    offset: [0, -50]
});
map.addOverlay(popup);

// display popup on click
map.on('click', function(evt) {
    var feature = map.forEachFeatureAtPixel(evt.pixel,
        function(feature) {
            return feature;
        });
    if (feature) {
        var coordinates = feature.getGeometry().getCoordinates();
        popup.setPosition(coordinates);
        $(element).popover({
            'placement': 'top',
            'html': true,
            'content': feature.get('name')
        });
        $(element).popover('show');
    } else {
        $(element).popover('destroy');
    }
});

// change mouse cursor when over marker
map.on('pointermove', function(e) {
    if (e.dragging) {
        $(element).popover('destroy');
        return;
    }
    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);
    map.getTarget().style.cursor = hit ? 'pointer' : '';
});
