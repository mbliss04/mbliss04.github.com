define(['views/QuestionsView'], function(QuestionsView) {

    var MainRouter = Backbone.Router.extend ({ 
        initialize: function() {

        },
        routes: { 
            ''      : 'home', 
            'q'     : 'showQuestions',
            'q/:id' : 'oneQuestion'
        }, 
        home: function () { 
            var that = this;
            $('#title').addClass('visible');
            $('#startQuiz').on('click', function() {
                that.navigate('/q', {trigger:true});
            });
        },
        showQuestions: function() {
            $('#landing').hide();
            var questions = new QuestionsView();
            questions.render();
        },
        oneQuestion: function(qID) {
            alert(qID);
        }
    });

    var initialize = function() {

        var router = new MainRouter();
        Backbone.history.start();

    };

    return {
        initialize: initialize
    }
});