MyCut.Views.ShowShop = Backbone.CompositeView.extend({
  template: JST['shops/show_shop'],

  initialize: function(){
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reviews(), "add", this.addReviewSubview);
    this.listenTo(this.model.reviews(), "remove", this.removeReviewSubview);
    this.model.reviews().each(this.addReviewSubview.bind(this));
  },

  addReviewSubview: function(review) {
    var reviewSubview = new MyCut.Views.ReviewIndexItem({
      model: review
    })
    this.addSubview('.review-items',reviewSubview);
  },

  removeReviewSubview: function(review) {
    this.removeModelSubview('.review-items', review);
  },
  render: function(){
    var barbers = this.model.barbers();
    var renderedContent = this.template({
      shop: this.model,
      barbers: barbers
    });
    this.$el.html(renderedContent)
    this.attachSubviews();
    return this;
  }
});
