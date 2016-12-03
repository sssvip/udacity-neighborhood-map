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

/* map start*/
var map;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 29.9994028521, lng: 106.2399021412 },
        zoom: 17
    });
    slidebar.open('slidebar-left');
}
/* map end*/

/*Model and ModelView start*/

//Model
var Location = function(data) {
    var self = this;
    self.name = data.title;
    self.location = data.location;
};

//locations data
var locations = [{
    name: 'Dough',
    location: {
        lat: 40.689023,
        lng: -73.957131
    },isClick:false
}, {
    name: 'Dough',
    location: {
        lat: 40.689023,
        lng: -73.957131
    },isClick:false
}, {
    name: 'Dough',
    location: {
        lat: 40.689023,
        lng: -73.957131
    },isClick:false
}, {
    name: 'Rucola',
    location: {
        lat: 40.685576,
        lng: -73.985893
    },isClick:false
}];

function MyViewModel() {
    var self = this;
    self.locations = ko.observableArray(locations);
    self.click = function() {
    	this.isClick=true;
    	console.log(this);
    }
}
var vm = new MyViewModel();
ko.applyBindings(vm);
/*Model and ModelView  end*/
