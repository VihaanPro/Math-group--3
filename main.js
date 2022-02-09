const questions = [
	{
			question: "9 k  –  5 k",
			optionA: "	4k",
			optionB: "0",
			optionC: "k",
			optionD: "9k",
			correctOption: "optionA"
	},{
			question: "7(y  +  4)  –  8",
			optionA: "19",
			optionB: "7y + 20",
			optionC: "9y - 13",
			optionD: "none of these",
			correctOption: "optionB"
	},{
			question: "Which of the following is the numerical coefficient of x2y2?",
			optionA: "2",
			optionB: "x2",
			optionC: "0",
			optionD: "1",
			correctOption: "optionD"
	},{
			question: "The value of x2 - 5 at x= -1 is-",
			optionA: "-7",
			optionB: "4",
			optionC: "-4",
			optionD: "None of the above",
			correctOption: "optionC"
	},{
			question: "Add: 3x2y, -5x2y, -x2y",
			optionA: "12x10y",
			optionB: "-4x6y",
			optionC: "3x9y",
			optionD: "-3x2y",
			correctOption: "optionD"
	},{
			question: "Subtract 24xy – 10y – 18x from 30xy + 12y – 14x.",
			optionA: "6xy + 22y + 4x",
			optionB: "x2 + 5xy + 2",
			optionC: "x-y",
			optionD: "none of the above",
			correctOption: "optionA"
	},{
			question: "From the sum of 2x2 + 3xy – 5 and 7 + 2xy – x2 subtract 3xy + x2 – 2.",
			optionA: " 6xy + 22y + 4x",
			optionB: " 2xy + 4",
			optionC: " x2 + 5xy + 2",
			optionD: "x – 2y2",
			correctOption: "optionC"
	},{
			question: "3(2x – 4) + x2 + 5 at x=-2",
			optionA: "-15",
			optionB: "15",
			optionC: "98",
			optionD: "12",
			correctOption: "optionA"
	},{
			question: "Find the value of t if the value of 3x2 + 5x – 2t = 8 at x=-1",
			optionA: "t = 8",
			optionB: "t = 5",
			optionC: "t = 3",
			optionD: "t = -5",
			correctOption: "optionD"
	},{
			question: `"Subtract the sum of -3x3y2 + 2x2y3 and -3x2y3 – 5y4 from x4 + x3y2 + x2y3 + y4."`,
			optionA: "x2y4",
			optionB: "2x2y + 3xy2 + 4y2",
			optionC: "2x3 – 3x2y ",
			optionD: "x4 + 4x3y2 + 2x2y3 + 6y4  ",
			correctOption: "optionD"
	}
]

let shuffledQuestions = []; 
const questionsCountByPeople = 10;
// const questionsCountByPeople = 3;
const questionsCount = questionsCountByPeople - 1;
let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

window.addEventListener('load', () =>  {
	document.querySelectorAll('.questions-count').forEach(element => {
		element.textContent = questionsCount + 1;
		// element.textContent = questionsCountByPeople;
	});
});

function handleQuestions() {
  while(shuffledQuestions.length <= questionsCount) {
    const random = questions[Math.floor(Math.random() * questions.length)];
    // let random = questions[Math.floor(Math.random() * 10)];
    // let random = questions[Math.floor(Math.random() * 23)];
    if(!shuffledQuestions.includes(random)) {
      shuffledQuestions.push(random);
    }
  }
}

function NextQuestion(index) {
  handleQuestions();
  // console.log(index);
  const currentQuestion = shuffledQuestions[index];
  // document.getElementById("question-number").innerHTML = '1';
  document.getElementById("question-number").innerHTML = questionNumber;
  document.getElementById("player-score").innerHTML = playerScore;
  // document.getElementById("player-score").innerHTML = '0';
  // document.getElementById("display-question").innerHTML = 'How many days makes a week ?';
  document.getElementById("display-question").innerHTML = currentQuestion.question;
  document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
  // document.getElementById("option-one-label").innerHTML = '10 days';
  document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
  // document.getElementById("option-two-label").innerHTML = '14 days';
  // document.getElementById("option-three-label").innerHTML = '17 days';
  document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
  // document.getElementById("option-four-label").innerHTML = '22 days';
  document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}

function checkForAnswer() {
  const currentQuestion = shuffledQuestions[indexNumber];
  const currentQuestionAnswer = currentQuestion.correctOption;
  const options = document.getElementsByName('option');
  let correctOption = null;
  options.forEach(option => {
    if(option.value === currentQuestionAnswer) {
      correctOption = option.labels[0].id;
    }
  });
  
  // if(options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked === false) {
  //   document.getElementById("option-modal").style.display = 'flex';
  // }

  options.forEach(option => {
    if(option.checked === true && option.value === currentQuestionAnswer) {
      document.getElementById(correctOption).style.background = '#63ff3f';
      playerScore++;
      indexNumber++;
      setTimeout(function() {
        questionNumber++;
      }, 1000);
    } else if (option.checked && option.value !== currentQuestionAnswer) {
      const wrongLabelId = option.labels[0].id;
      document.getElementById(wrongLabelId).style.background = '#ff6363';
      document.getElementById(correctOption).style.background = '#63ff3f';
      wrongAttempt++;
      indexNumber++;
      setTimeout(function() {
        questionNumber++;
      }, 1000);
    }
  });
}

function handleNextQuestion() {
  checkForAnswer();
  unCheckRadioButtons();
  setTimeout(() => {
    if (indexNumber <= questionsCount) {
      NextQuestion(indexNumber);
    } else {
      handleEndGame();
    }
    resetOptionBackground();
  }, 1000);
}

function resetOptionBackground() {
  const options = document.getElementsByName('option');
  options.forEach(option => {
    document.getElementById(option.labels[0].id).style.background = '#ffdc63';
  });
}

function unCheckRadioButtons() {
  const options = document.getElementsByName('option');
  for(let i = 0; i < options.length; i++) {
    options[i].checked = false;
  }
}

function handleEndGame() {
  let remark = null;
  let remarkColor = null;
  if(playerScore <= questionsCountByPeople * 0.3) {
    remark = "Bad Grades, keep practicing";
    remarkColor = 'red';
  } else if (playerScore > questionsCountByPeople * 0.3 && playerScore <= questionsCountByPeople * 0.7) {
    remark = "Average Grades, You can do better";
    // remarkColor = 'red';
    remarkColor = 'orange';
  } else if (playerScore > questionsCountByPeople * 0.7) {
    remark = 'Excellent, keep the good work going';
    remarkColor = 'green';
  }
  const playerGrade = (playerScore / questionsCountByPeople) * 100;
  document.getElementById('remarks').innerHTML = remark;
  document.getElementById('remarks').style.color = remarkColor;
  document.getElementById('grade-percentage').innerHTML = playerGrade.toFixed(0);
  document.getElementById('wrong-answers').innerHTML = wrongAttempt;
  document.getElementById('right-answers').innerHTML = playerScore;
  document.getElementById('score-modal').style.display = 'flex';
  document.getElementById('btn-continue').innerText = 'Restart';
}

function closeScoreModal() {
  questionNumber = 1;
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  shuffledQuestions = [];
  NextQuestion(indexNumber);
  // NextQuestion(0);
  document.getElementById('score-modal').style.display = 'none';
}

function closeOptionModal() {
  document.getElementById('option-modal').style.display = 'none';
}
