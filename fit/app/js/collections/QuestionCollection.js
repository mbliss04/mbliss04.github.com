define(['models/QuestionModel'], function(QuestionModel) {
    var QuestionCollection = Backbone.Collection.extend({
        url: "/questions",
        model: QuestionModel, 
        parse: function(response) {
            for(var i = 0; i < response.length; i++) {
                response[i].qnum = i + 1;
            }
            return response;
        }
    });
    return QuestionCollection;
});