define(["models/QuestionModel"], function(QuestionModel) {
  var QuestionView = Backbone.View.extend({
    tagName: 'li',
    model: new QuestionModel(),
    template: _.template($("#questionTemplate").html()),
    initialize: function () {
        this.model.on('change', this.render());
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }, 
    events: {
        "click .next" : "next",
        "click .back" : "back"
    },
    next: function(model) {
        console.log(model);
    },
    back: function(model) {
        console.log(model);
    }
  });
  return QuestionView;
});