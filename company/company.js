$(document).ready(function(){

	var num_questions = 15;
	questions = [];
	var new_question = '';

	for (i = 0; i < num_questions; i++) {
		questions[i] = ("section-" + (i + 1));
	}

	/*
	$.getJSON('questions.json', function(json) {

		for (i = 0; i < json.length; i++) {
			new_question += '<section class="question" id="' + questions[i] + '"><fieldset><h2>' + json[i].question + '<h2>';
			for (j = 0; j < json[i].options.length; j++) {
				new_question += '<div><input type="radio" name="q' + (i + 1) + '" id="q-' + (j + 1) + '" value="' + (j + 1) +'" />';
				new_question += '<label for="q-' + (j + 1) + '"> ' + (j + 1) + ". " + json[i].options[j] + ' </label></div>';
			}
			new_question += '</fieldset><input type="button" class="formee-button next-button" id="' + (i + 1) +'" name="next" value="next"></section>';
	                $('#questionnairre').append(new_question);
	        }

        });
	*/

	$(".next-button").click(function(){

		selected_id = '';
		
		console.log(this.id);

		cur_question = parseInt(this.id);
		console.log("current = " + cur_question);

		selected_id += "#" + questions[cur_question]; 

		$(selected_id).hide(500, function(){

			cur_question = cur_question + 1;

			console.log("new = " + cur_question);

			next_id += "#" + questions[cur_question]; 

			$(next_id).show(500, function(){
				$(next_id).removeClass('hidden');
			});
		});

	});

});