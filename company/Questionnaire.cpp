/* ----------------------------------------
Questionnaire.cpp
Author: McCall Bliss
Created: 12/23/13
Last Modified: 12/23/13

Implementation file that outlines the class questionnaire 
and its private and public functions.
-----------------------------------------*/

#include "Questionnaire.h"

// default constructor
Questionnaire::Questionnaire() {

	qlist = NULL;
	numQuestions = 0;
	alist = NULL;

}

// reads in all the questions and stores in list
void Questionnaire::initQuestions() {

	int qNum;
	string title, option;

	//while(getline(cin, ))

}


// destructor
Questionnaire::~Questionnaire() {

}