/* ----------------------------------------
Questionnaire.h
Author: McCall Bliss
Created: 12/23/13
Last Modified: 12/23/13

Header file that outlines the class dictionary and its private and public
functions.
-----------------------------------------*/

#ifndef QUESTION_H
#define QUESTION_H

#include <cstdlib>
#include <string>
#include <iostream>
#include <cctype>
using namespace std;

class Questionnaire {
public:
	// default constructor
	Questionnaire();

	// destructor
	~Questionnaire();

private:
	// list of questions
	list<Question> qlist;

	// number of questions
	int numQuestions;

	// reads in all the questions and stores in list
	void initQuestions();

	// list of answers
	list<Answer> alist;
	
};

#endif