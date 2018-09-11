var map;
var infoWindow;

//* ***************** ********************************** ******
//  Locations  - locations and coordinates of Atlanta HotSpots
//* ***************** ********************************** ******
var locations = [{
        title: 'Georgia Aquarium',
        location: {
            lat: 33.763382,
            lng: -84.39511
        }
    }, {
        title: 'World of Coca Cola',
        location: {
            lat: 33.762869,
            lng: -84.39267
        }
    }, {
        title: 'Atlanta History Center',
        location: {
            lat: 33.841823,
            lng: -84.386269
        }
    }, {
        title: 'Atlanta Botanical Gardens',
        location: {
            lat: 33.790468,
            lng: -84.373619
        }
    }, {
        title: 'High Museum of Art',
        location: {
            lat: 33.790063,
            lng: -84.385552
        }
    }, {
        title: 'Phillips Arena',
        location: {
            lat: 33.757289,
            lng: -84.396324
        }
    },
    {
        title: 'Centennial Olympic Park',
        location: {
            lat: 33.759425,
            lng: -84.391975
        }
    },
    {
        title: 'Zoo Atlanta',
        location: {
            lat: 33.734098,
            lng: -84.372268
        }
    },
    {
        title: 'Woodruff Arts Center',
        location: {
            lat: 33.78939,
            lng: -84.384656
        }
    },
    {
        title: 'Fox Theatre',
        location: {
            lat: 33.772585,
            lng: -84.38560
        }
    },
    {
        title: 'Bodies The Exhibition',
        location: {
            lat: 33.792671,
            lng: -84.394647
        }
    },
    {
        title: 'Phipps Plaza',
        location: {
            lat: 33.852544,
            lng: -84.361986
        }
    }
];

//* ***************** ***********
//  Google API - Creates new map
//* ***************** ***********
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 33.763, lng: -73.945 },
        zoom: 12,

        //* ***************** * ******************
        //  Google Map Styles a map in night mode.
        //* ***************** ********************
        styles: [
            { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
            { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: [{ color: '#263c3f' }]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#6b9a76' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{ color: '#38414e' }]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#212a37' }]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#9ca5b3' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{ color: '#746855' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{ color: '#1f2835' }]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#f3d19c' }]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: [{ color: '#2f3948' }]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#d59563' }]
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{ color: '#17263c' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{ color: '#515c6d' }]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{ color: '#17263c' }]
            }
        ]
    });

    //* ***************** * ********
    //  InfoWindows and Markers
    //* ***************** * ********
    // Set InfoWindow
    var largeInfowindow = new google.maps.InfoWindow();
    infoWindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    //Initialization of markers using location array
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        //Marker gets to be visible by default
        marker.setVisible(true);
        // markers.push(marker);
        vm.locationsList()[i].marker = marker;
        // On click event to open the large infowindow at each marker and change animation
        bounds.extend(marker.position);

        marker.addListener('click', function() {
            populateInfoWindow(this, infoWindow);
            animateUponClick(this);
        });

    }
    map.fitBounds(bounds);
} // end InitMap

//* ***************** * ********
//  Marker Animation
//* ***************** * ********

// Adds two bounces after clicking.
function animateUponClick(marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function() {
        marker.setAnimation(null);
    }, 1460);
}

// Infowindow populates when marker is clicked.
// Used and modified from Udacity lectures.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time
        // to load.
        infowindow.setContent('');
        infowindow.marker = marker;

        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });

        //* ***************** * ********
        //  InfoWindows and Markers
        //* ***************** * ********
        // Used and modified from Udacity lectures.

        var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // If status is OK and pano is located, compute the
        // position of the streetview image, then calculate the heading, obtain a
        // panorama from the heading and set the options.
        function getStreetView(data, status) {
            if (status == google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng;
                var heading = google.maps.geometry.spherical.computeHeading(nearStreetViewLocation, marker.position);
                // infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
                var panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
            } else {
                infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Street View Found</div>');
            }
        }


        //* ***************** * ********************
        //  Additional Data Location - 3rd Party API
        //* ***************** * ********************

        // Wikipedia API Ajax request - From Udacity lecture.
        var wikiURL = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + marker.title + '&format=json&callback=wikiCallback';
        $.ajax(wikiURL, {
            dataType: "jsonp",
            data: {
                async: true
            }
        }).done(function(response) {
            var articleStr = response[1];
            var URL = 'http://en.wikipedia.org/wiki/' + articleStr;
            // Use streetview service to get the closest streetview image within
            // 50 meters of the markers position
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            infowindow.setContent('<div>' +
                '<h3>' + marker.title + '</h3>' + '</div><br><a href ="' + URL + '">' + URL + '</a><hr><div id="pano"></div>');
            // Open the infowindow on the correct marker.
            infowindow.open(map, marker);
        }).fail(function(jqXHR, textStatus) {
            streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView);
            infowindow.setContent('<div>' +
                '<h3>' + marker.title + '</h3>' + '</div><br><p>Sorry. We could not contact Wikipedia! </p><hr><div id="pano"></div>');
            infowindow.open(map, marker);
        });

    }

    //* ***************** *
    //  Error Handling
    //* ***************** *
}

function googleError() {
    alert(
        'Google Maps did not load. Please refresh the page and try again!'
    );
};