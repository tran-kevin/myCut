MyCut.Views.ReviewsIndex = Backbone.CompositeView.extend({
  template: JST['reviews/index'],
  initialize: function(){
    this.listenTo(this.collection, "add", this.addReviewSubview);
    this.listenTo(this.collection, "remove", this.removeReviewSubview);
    this.collection.each(this.addReviewSubview.bind(this));
  },

  addReviewSubview: function(review) {
    var reviewSubview = new MyCut.Views.ReviewIndexItem({
      model: review
    })
    this.addSubview('.review-items',reviewSubview);
  },

  removeReviewSubview: function(review) {
    this.removeSubview('.review-items', review);
  },

  render: function(){
    var reviewIndexView = this.template();
    this.$el.html(reviewIndexView);
    this.attachSubviews();
    return this;
  }


});