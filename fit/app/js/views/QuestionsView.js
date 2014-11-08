define(["collections/QuestionCollection", "views/QuestionView"], function(QuestionCollection, QuestionView) {
    var QuestionsView = Backbone.View.extend({
        el: $('#questions'),
        template: "<%= questions %>",
        initialize: function() {
            var that = this;
            this.collection = new QuestionCollection();
            this.listenTo(this.collection, 'sync', this.addEvents);
            this.collection.fetch({
                success: function() {
                    that.$el.animate({opacity:1}, 400);
                    console.log(that.collection);
                }
            });
        },
        render: function() {
            this.$el.html( _.template(this.template, {questions:this.collection.models} ));
            return this;
        },
        addEvents: function(questions) {
            var that = this;
            this.$el.empty();
            questions.each(function(question) {
                that.addOne(question);
            });
        },
        addOne: function(question){
            var questionView = new QuestionView({model: question});
            this.$el.append(questionView.render({collection:true}).el);
        }
    });
    return QuestionsView;
});