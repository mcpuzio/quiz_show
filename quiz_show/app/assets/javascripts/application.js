// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs

//= require_tree .

var curPage = 0,
    correct = 0;
var myAnswers = [];
/// [ HEADER , IMAGE , CORRECT ANSWER , ANSWER 1, ANSWER 2, ANSWER 3, ANSWER 4 ]
var myQuiz = [
    ["What is Bob Dylan's real name?", "1.jpg", 1, "Robert Zimmerman", "Bob Zimmerman", "Dylan Thomas", "Robert Dylan"],
    ["The 1980's hit song 'Take on me' was performed by ", "2.jpg",1, "A-ha ", "Duran Duran", "Flock of Seagulls", "Wham!"],
    
    ["Which country did Germany invade on the 1st of September 1939?", "3.jpg",4, "France", "Czechoslovakia", "Finland", " Poland "],

	["What is the oldest known story in the world?", "3.jpg",3, "The Bible", "The Histories", "The Epic of Gilgamesh", " The Odyssey "],

	["Who defeated Hannibal at the Battle of Zama?", "3.jpg",2, "George Washington", "Scipio Africanus", "Pyrrhus of Epirus", " Alexander the Great "],

	
];

var lengthofobject = myQuiz.length-1;
var newimage = document.getElementById("quizimage");
var myHeader = document.getElementById("quizHeader");
var classname = document.getElementsByClassName("answer");
var myQuestion = document.getElementById("questions");
var progressBar = document.getElementById("progressBar");
var next = document.getElementById("next");
var previous = document.getElementById("previous");
var finish = document.getElementById("finishQuiz");
checkPage();
next.addEventListener("click", moveNext);
previous.addEventListener("click", moveBack);
finish.addEventListener("click", endQuiz);
for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('click', myAnswer, false);
}



function myAnswer() {
    var idAnswer = this.getAttribute("data-id");
    /// check for correct answer
    myAnswers[curPage] = idAnswer;
    if (myQuiz[curPage][2] == idAnswer) {
        //console.log('Correct Answer');
    } else {
        //console.log('Wrong Answer');
    }
    addBox();
}

function addBox() {
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
}

function moveNext() {
    ///check if an answer has been made
    if (myAnswers[curPage]) {
        //console.log('okay to proceed');
        if (curPage < (myQuiz.length - 1)) {
            curPage++;
            checkPage(curPage);
        } else {
            ///check if quiz is completed
            //console.log(curPage + ' ' + myQuiz.length);
            if (myQuiz.length >= curPage) {
                endQuiz();
            } else {
                //console.log('end of quiz Page ' + curPage);
            }
        }
    } else {
        //console.log('not answered');
    }
}

function endQuiz() {
    if (myAnswers[lengthofobject]) {
        var output = "<div class='output'>Quiz Results<BR>";
        var questionResult = "NA";
        //console.log('Quiz Over');
        for (var i = 0; i < myAnswers.length; i++) {
            if (myQuiz[i][2] == myAnswers[i]) {
                questionResult = '<span class="glyphicon glyphicon-ok-circle" aria-hidden="true"></span>';
                correct++;
            } else {
                questionResult = '<span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span>';
            }
            output = output + '<p>Question ' + (i + 1) + ' ' + questionResult + '</p> ';
        }
        output = output + '<p>You scored ' + correct + ' out of ' + myQuiz.length + '</p></div> ';
        document.getElementById("quizContent").innerHTML = output;
    } else {
        //console.log('not answered');
    }
}

function checkPage(i) {
    /// add remove disabled buttons if there are no more questions in que
    if (curPage == 0) {
        previous.classList.add("hide");
    } else {
        previous.classList.remove("hide");
    }
    if ((curPage + 1) < (myQuiz.length)) {
        next.classList.remove("hide");
    } else {
        next.classList.add("hide");
        finish.classList.remove("hide");
    }
    myHeader.innerHTML = myQuiz[curPage][0];
	newimage.src = myQuiz[curPage][1];
    for (var i = 0; i < myQuestion.children.length; i++) {
        var curNode = myQuestion.children[i];
        curNode.childNodes[1].innerHTML = capitalise(myQuiz[curPage][(i + 3)]);
        //check if answered already
        if (myAnswers[curPage] == (i + 1)) {
            curNode.classList.add("selAnswer");
        } else {
            curNode.classList.remove("selAnswer");
        }
    }
    ///update progress bar
    var increment = Math.ceil((curPage) / (myQuiz.length) * 100);
    progressBar.style.width = (increment) + '%';
    progressBar.innerHTML = (increment) + '%';
}

function moveBack() {
    if (curPage > 0) {
        curPage--;
        checkPage(curPage);        	
    } else {
        //console.log('end of quiz Page ' + curPage);
    }
}

function capitalise(str) {
 	return str.substr(0,1).toUpperCase() + str.substr(1);
 }