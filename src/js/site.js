// Polyfill for position: sticky
new StickyState(document.querySelectorAll('.sticky'));

// Navbar auto highlight
$('body').scrollspy({ target: '#navbar' });

// Google Map
function initMap() {
    var wustl = {lat: 38.634468, lng: -90.262376};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 19,
        center: wustl,
        scrollwheel: false,
    });
    var marker = new google.maps.Marker({
        position: wustl,
        map: map,
        // label: 'ABC'
    });
}

