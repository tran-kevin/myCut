MyCut.Views.IndexMap = Backbone.View.extend({
  initMap: function(){
    var mapOptions = {
      center: { lat: 37.7833, lng: -122.2591 },
      zoom: 12
    };
    this._map = new window.google.maps.Map(this.el, mapOptions);
  }

  // render: function()
});
