/*slidebar start*/
// Create a new instance of Slidebars
var slidebar = new slidebars();
// Initialize Slidebars
slidebar.init();
// Left Slidebar controls
$('#menu').on('click', function(event) {
    slidebar.toggle('slidebar-left');
});
//auto show the slidebar
slidebar.open('slidebar-left');
//remain the hover effect

/*slidebar end*/


/*Model and ModelView start*/
//locations data
var locations = [{
    name: 'Post Office',
    location: {
        lat: 39.9618757032,
        lng: 116.3570594788
    },
}, {
    name: 'Road of West City',
    location: {
        lat: 39.9617276827,
        lng: 116.3549137115
    },
}, {
    name: 'Basketball Ground',
    location: {
        lat: 39.9626651405,
        lng: 116.3590121269
    },
}, {
    name: 'Road of XinTan',
    location: {
        lat: 39.9635696928,
        lng: 116.3548493385
    },
}, {
    name: 'Good Ground',
    location: {
        lat: 39.9632078733,
        lng: 116.3560080528
    },
}];


//Model
function ViewModel() {
    var self = this;
    //copyLocations in order observableArray's remove() to not remove the localtions data(remain the data source)
    var copyLocations = [];
    for (var i = 0; i < locations.length; i++) {
        copyLocations.push(locations[i]);
    }
    self.locations = ko.observableArray(copyLocations);
    self.markers = ko.observableArray();
    self.infoWindows = ko.observableArray();
    self.networkError=ko.observable(false);
    self.filterContent = '';
    //
    self.click = function(location) {
        var index = self.locations.indexOf(location);
        toggleBounce(markers[index], infoWindows[index]);
    }
    self.filter = function() {
        //filter is none
        if (self.filterContent == '') {
            if (self.locations.length != locations.length) {
                self.locations.removeAll();
                for (var i = 0; i < locations.length; i++) {
                    self.locations.push(locations[i]);
                }
            }
            clearAllBounceAndInfo();
            return;
        }
        //filter data
        var tempLocations = [];
        for (var i = 0; i < locations.length; i++) {
            if (locations[i].name.toLowerCase().indexOf(self.filterContent.toLowerCase()) > -1) {
                tempLocations.push(locations[i]);
            }
        }
        if (tempLocations.length > 0) {
            self.locations.removeAll();
            for (var i = 0; i < tempLocations.length; i++) {
                self.locations.push(tempLocations[i]);
            }
        } else {
            self.locations.removeAll();
        }
        console.log(tempLocations.length)
            //find the marker's index
        var tempMarkers = [];
        for (var i = 0; i < tempLocations.length; i++) {
            tempMarkers.push(markers[locations.indexOf(tempLocations[i])]);
        }
        showMarkers(tempMarkers);
    }
}

/*Model and ModelView  end*/

/* map start*/
var map;
var infoWindows = [];
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: locations[0].location,
        zoom: 17
    });
    //init markers and infowindow
    for (var i = 0; i < locations.length; i++) {
        var marker = new google.maps.Marker({
            position: locations[i].location,
            map: map,
            title: locations[i].name,

        });
        markers.push(marker);
        var infowindow = new google.maps.InfoWindow({
            content: locations[i].name,
        });
        infoWindows.push(infowindow);
        markers[i].addListener('click', function() {
            toggleBounce(this, infowindow);
        });
    }
    //push into vm
    for (var i = 0; i < locations.length; i++) {
        vm.markers.push(markers[i]);
        vm.infoWindows.push(infoWindows[i]);
    }
}

function toggleBounce(marker, infowindow) {
    if (marker.getAnimation() != null) {
        marker.setAnimation(null);
        infowindow.close(map, marker);
    } else {
        clearAllBounceAndInfo();
        marker.setAnimation(google.maps.Animation.BOUNCE);
        infowindow.setContent(marker.title);
        infowindow.open(map, marker);
    }
}

function showMarkers(markers) {
    clearAllBounceAndInfo();
    for (var i = 0; i < markers.length; i++) {
        markers[i].setAnimation(google.maps.Animation.BOUNCE);
    }
}

function clearAllBounceAndInfo() {
    for (var i = 0; i < locations.length; i++) {
        markers[i].setAnimation(null);
        infoWindows[i].close(map, markers[i]);
    }
}
/* map end*/

var vm = new ViewModel();
ko.applyBindings(vm);

function initMapError(){
    vm.networkError(true);
}