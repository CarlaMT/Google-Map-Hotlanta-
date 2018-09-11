var Location = function(data) {
    this.title = data.title;
    this.location = data.location;
};

var ViewModel = function() {
    var me = this;

    me.locationsList = ko.observableArray([]);
    locations.forEach(function(location) {
        me.locationsList.push(new Location(location));
    });

    me.filter = ko.observable('');
    me.filteredLocations = ko.computed(function() {
        var filterResult = me.filter().toLowerCase();

        if (!filterResult) {
            for (var i = 0; i < me.locationsList().length; i++) {
                //After running code the first time there are no 
                //visible markers after checking if markers were defined.
                //After verification, resets to visible. 
                if (me.locationsList()[i].marker) {
                    me.locationsList()[i].marker.setVisible(true);
                }
            } //end for loop
            return me.locationsList();
        } else {
            return ko.utils.arrayFilter(me.locationsList(), function(loc) {
                // test to see if item matches filter and store results as a variable
                var match = loc.title.toLowerCase().indexOf(filterResult) >= 0;
                // set marker visibility based on match status
                if (loc.marker) {
                    loc.marker.setVisible(match);

                }
                // return match status to item in list view if match
                return match;
            });
        }
    }, me);

    me.clearFilter = function() {
        me.filter('');

        for (var i = 0; i < me.locationsList().length; i++) {
            //get all the markers back
            me.locationsList()[i].marker.setVisible(true);
        }
    };

    //* ***************** * **********************************
    // Side Bar Array | Selection of location with InfoWindow
    //* ***************** * **********************************
    self.currentLocation = ko.observableArray([this.locationsList()[0]]);
    this.selectLocation = function(clickedLocation) {
        //sets the current location(clickedLocation);
        animateUponClick(clickedLocation.marker);
        //populating the info window by clicked marker from list
        populateInfoWindow(clickedLocation.marker, infoWindow);
    };
    //Observable for Menu | Navigation Bar Toggle Button
    self.visibleMenu = ko.observable(false),
        //Showing/Hiding the menu
        self.clickMe = function() {
            self.visibleMenu(!self.visibleMenu());
        };

};

var vm = new ViewModel();
ko.applyBindings(vm);