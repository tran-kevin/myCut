MyCut.Views.ShopIndex = Backbone.CompositeView.extend({
  template: JST['shops/shop_index'],

  initialize: function() {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addShopSubviews)
    this.listenTo(this.collection, "remove", this.removeShopSubviews)
    this.collection.each(this.addShopSubviews.bind(this));
  },

  addShopSubviews: function(shop) {
    var shopSubview = new MyCut.Views.ShopItem({ model: shop });
    this.addSubview(".shops-index", shopSubview);
  },

  removeShopSubviews: function(shop){
    this.removeSubview(".shops-index", shop);
  },

  render: function(){
    var renderedContent = this.template()
    this.$el.html(renderedContent)
    this.attachSubviews();
    return this;
  }

});