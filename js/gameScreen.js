import {gameQuestions} from "../assets/questionsFile.js";
import { applyBackgroundGradient } from '../assets/theme.js';
applyBackgroundGradient();

const groups = JSON.parse(localStorage.getItem('groups')) || [];
let currentCategory = JSON.parse(localStorage.getItem('currentCategory')) || 0;

let questionIndex = 0;
let currentGroup = 0;
let questions = [];

// Aux functions
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCategory(){
  let val = gameQuestions[currentCategory];
  let category = val.category;
  questions = val.questions;

  let catImg = document.getElementById("levelImage");
  catImg.src = "../assets/" + category + ".png";
}

function startCategorypoints(){
  groups.forEach(group => group.categoryPoints.push(0));
}

// Game logic
function handleAnswer(button) {
  // Get correct answer and group who is clicking in the button
  const correctAnswer = questions[questionIndex].answer;
  const group = groups[currentGroup];

  // Add group image to button
  const groupImg = document.createElement('img');
  groupImg.src = group.image || '../assets/default_group_image.png';
  groupImg.classList.add('imgButtonGroup');

  let imgsContainer = button.querySelector(".imgsContainer");

  if(!imgsContainer){
    imgsContainer = document.createElement('div');
    imgsContainer.classList.add('imgsContainer');
    button.appendChild(imgsContainer);
  }
  imgsContainer.appendChild(groupImg);

  // Check answer, update points and move to next group
  if (button.textContent === correctAnswer) {
    group.categoryPoints[currentCategory] += 1;
    group.points += 1;

  }
  currentGroup++;

  // Show reveal button if all groups have answered
  if (currentGroup === groups.length) {    
    const revealButton = document.getElementById('revealAnswerButton');
    revealButton.style.opacity = 1;
    revealButton.style.pointerEvents = 'auto';
  };

}

// Game rendering

function renderGroups(){
    const ul = document.getElementById('groupsDisplay');
    ul.innerHTML = '';

    groups.forEach(group => {
        const li = document.createElement('li');

        const img = document.createElement('img');  
        img.src = group.image || '../assets/default_group_image.png';
        img.classList.add('groupImage');
        li.appendChild(img);

        const pointsSpan = document.createElement('h2');
        pointsSpan.textContent = group.categoryPoints[currentCategory];
        pointsSpan.classList.add('groupPoints');
        li.appendChild(pointsSpan);

        li.classList.add('groupItem');
        ul.appendChild(li);
    });
    
}

function renderQuestion(i){
  const questionContainer = document.getElementById('questionContainer');
  questionContainer.innerHTML = ''; 

  const question = document.createElement('h2');
  question.textContent = questions[i].question;
  questionContainer.appendChild(question);
}

function renderOptions(i){
  const optionsContainer = document.getElementById('optionsContainer');
  optionsContainer.innerHTML = '';

  const firstRow = document.createElement('div');
  firstRow.classList.add('firstRow');

  const secondRow = document.createElement('div');
  secondRow.classList.add('secondRow');

  questions[i].options.forEach((option,i) => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('optionButton');

    button.addEventListener('click', () => {
    handleAnswer(button);
    });

    if(i >= 2){
      secondRow.appendChild(button);
    }else{
      firstRow.appendChild(button);
    }
  });

  optionsContainer.appendChild(firstRow);
  optionsContainer.appendChild(secondRow);
}

function revealRightOption(){
  const answer = questions[questionIndex].answer;
  const optionsButtons = document.querySelectorAll('.optionButton');
  optionsButtons.forEach(button => {
    if(button.textContent === answer){
      button.style.backgroundColor = 'green';
      button.style.color = 'white';
    }
  });

  const nextButton = document.getElementById('nextQuestionButton');
  nextButton.style.opacity = 1;
  nextButton.style.pointerEvents = 'auto';
  
  renderGroups();
}

function renderGameScreen(){

  if(questions.length === 0){
    currentCategory++;
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('currentCategory', JSON.stringify(currentCategory))
    window.location.href = '../pages/tableScreen.html'
  }

  console.log(groups);
  questionIndex = randomInt(0,questions.length-1);
  renderGroups();
  renderQuestion(questionIndex);
  renderOptions(questionIndex);
}

document.getElementById("nextQuestionButton").addEventListener('click', () => {
    currentGroup = 0;
    questions.splice(questionIndex, 1);

    const revealButton = document.getElementById('revealAnswerButton');
    revealButton.style.opacity = 0;
    revealButton.style.pointerEvents = 'none';
    const nextButton = document.getElementById('nextQuestionButton');
    nextButton.style.opacity = 0;
    nextButton.style.pointerEvents = 'none';

  renderGameScreen();
});

document.getElementById("revealAnswerButton").addEventListener('click', () => {
  revealRightOption();
}); 


setCategory();
startCategorypoints();
renderGameScreen();

