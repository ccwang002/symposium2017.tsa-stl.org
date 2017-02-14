// Polyfill for position: sticky
new StickyState(document.querySelectorAll('.sticky'));

// Navbar auto highlight
$('body').scrollspy({ target: '#navbar' });

// Google Map
function initMap() {
    var center = {lat: 38.634150, lng: -90.262376};
    var wustl = {lat: 38.634468, lng: -90.262376};
    var parking = {lat: 38.633744, lng: -90.260160};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: center,
        scrollwheel: false,
    });

    // Marker setting for the Symposium
    var wustlMarker = new google.maps.Marker({
        position: wustl,
        map: map,
        title: "Symposium (McDonnell Medical Sciences Building)"
        // label: 'ABC'
    });
    var wustlInfoWindow = new google.maps.InfoWindow({
        content: "<div class='map-info'>" +
            "<h4>Symposium</h4>" +
            "<p>Cori Auditorium<br>" +
            "McDonnell Medical Sciences Building<br>" +
            "4564 McKinley Ave., St. Louis, MO 63110<p>" +
            "</div>"
    });
    wustlMarker.addListener('click', function () {
        wustlInfoWindow.open(map, wustlMarker);
    });

    // Marker setting for the parking
    var parkingMarker = new google.maps.Marker({
        position: parking,
        map: map,
        label: 'P',
        title: "Parking space (Lot F)"
    });
    var parkingInfoWindow = new google.maps.InfoWindow({
        content: "<div class='map-info'>" +
            "<h4>Parking</h4>" +
            "<p>Parking Lot F<br>4510 McKinley Ave., St. Louis, MO 63110</p>" +
            "<p>Free of charge; entrance on S. Taylor Ave.</p>" +
            "</div>"
    });
    parkingMarker.addListener('click', function () {
        parkingInfoWindow.open(map, parkingMarker);
    });

}

