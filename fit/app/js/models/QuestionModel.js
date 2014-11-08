define([], function() {
  var QuestionModel = Backbone.Model.extend({
    defaults: {
        question: "",
        qnum: 0,
        options: [], 
        weight: []
    }, 
    url: "/questions"
  });
  return QuestionModel;
});