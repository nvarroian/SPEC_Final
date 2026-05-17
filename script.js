const startScreen = document.getElementById('startScreen');
const categoryScreen = document.getElementById('categoryScreen');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const continueBtn = document.getElementById('continueBtn');
const categoryBtns = document.querySelectorAll('.category-btn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const skipBtn = document.getElementById('skipBtn');

const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const questionCount = document.getElementById('questionCount');
const progressBar = document.getElementById('progressBar');
const timerDisplay = document.getElementById('timer');

const finalScore = document.getElementById('finalScore');
const summaryList = document.getElementById('summaryList');
const performanceMessage = document.getElementById('performanceMessage');
const playerResultName = document.getElementById('playerResultName');

const homeNav = document.getElementById('homeNav');
const categoryNav = document.getElementById('categoryNav');

let playerName = '';
let currentCategory = '';
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 10;
let summary = [];

const questions = {
movies: [
{
question: 'Which movie features a ship called the Titanic?',
answers: ['Avatar', 'Titanic', 'Frozen', 'Jaws'],
correct: 'Titanic'
},
{
question: 'Who is the main villain in the movie The Avengers?',
answers: ['Loki', 'Thanos', 'Ultron', 'Red Skull'],
correct: 'Loki'
},
{
question: 'In Harry Potter, what house does Harry belong to?',
answers: ['Slytherin', 'Ravenclaw', 'Gryffindor', 'Hufflepuff'],
correct: 'Gryffindor'
},
{
question: 'What is the highest-grossing movie of all time (without inflation adjustment)?',
answers: ['Avatar', 'Titanic', 'Avengers: Endgame', 'Frozen II'],
correct: 'Avatar'
},
{
question: 'Which movie features the quote “I am Iron Man”?',
answers: ['Iron Man', 'Avengers: Infinity War', 'Captain America', 'Thor'],
correct: 'Iron Man'
},
{
question: 'In Frozen, who is Elsa sister?',
answers: ['Rapunzel', 'Anna', 'Moana', 'Merida'],
correct: 'Anna'
},
{
question: 'What kind of animal is Po in Kung Fu Panda?',
answers: ['Tiger', 'Bear', 'Panda', 'Monkey'],
correct: 'Panda'
},
{
question: 'Which movie is about blue aliens living on Pandora?',
answers: ['Star Wars', 'Avatar', 'Dune', 'Alien'],
correct: 'Avatar'
},
{
question: 'Who directed Jurassic Park?',
answers: ['Christopher Nolan', 'Steven Spielberg', 'James Cameron', 'Tim Burton'],
correct: 'Steven Spielberg'
},
{
question: 'What is the name of the cowboy in Toy Story?',
answers: ['Buzz', 'Woody', 'Jessie', 'Andy'],
correct: 'Woody'
},
],

games: [
{
question: 'Which company created Minecraft?',
answers: ['Valve', 'Mojang', 'Epic Games', 'Rockstar'],
correct: 'Mojang'
},
{
question: 'Who is the main character of God of War?',
answers: ['Kratos', 'Atreus', 'Joel', 'Arthur'],
correct: 'Kratos'
},
{
question: 'In PUBG and Fortnite, what genre is the game?',
answers: ['RPG', 'Battle Royale', 'Puzzle', 'Horror'],
correct: 'Battle Royale'
},
{
question: 'What is the name of the yellow electric Pokémon mascot?',
answers: ['Eevee', 'Pikachu', 'Snorlax', 'Charmander'],
correct: 'Pikachu'
},
{
question: 'Which game features creepers?',
answers: ['Roblox', 'Valorant', 'Minecraft', 'CTA V'],
correct: 'Minecraft'
},
{
question: 'In Among Us, what is the hidden enemy called?',
answers: ['Hunter', 'Zombie', 'Impostor', 'Raider'],
correct: 'Impostor'
},
{
question: 'What color is Sonic the Hedgehog?',
answers: ['Red', 'Blue', 'Yellow', 'Green'],
correct: 'Blue'
},
{
question: 'Which game is known for the phrase “Victory Royale”?',
answers: ['Fortnite', 'Call of Duty', 'Apex Legends', 'Free fire'],
correct: 'Fortnite'
},
{
question: 'What is the blocky online game platform popular for user-made games?',
answers: ['Steam', 'Roblox', 'Valorant', 'Terraria'],
correct: 'Roblox'
},
{
question: 'In Pac-Man, what do the ghosts try to do?',
answers: ['Help Pac-Man', 'Feed Pac-Man', 'Catch Pac-Man', 'Race Pac-Man'],
correct: 'Catch Pac-Man'
},
],

anime: [
{
question: 'What is the name of Naruto signature move?',
answers: ['Chidori', 'Rasengan', 'Bankai', 'Kamehameha'],
correct: 'Rasengan'
},
{
question: 'Who uses the Death Note?',
answers: ['Luffy', 'Light Yagami', 'Naruto', 'Ichigo'],
correct: 'Light Yagami'
},
{
question: 'Who wants to become Hokage in Naruto?',
answers: ['Sasuke', 'Kakashi', 'Naruto', 'Garaa'],
correct: ''
},
{
question: 'What is the name of Luffy crew in One Piece?',
answers: ['Red Pirates', 'Straw Hat Pirates', 'Black bulls', 'Soul Reaper'],
correct: 'Straw Hat Pirates'
},
{
question: 'In Dragon Ball Z, who is Goku’s strongest enemy?',
answers: ['Frieza', 'Vegeta', 'Cell', 'Krillin'],
correct: ''
},
{
question: 'Which anime features Titans?',
answers: ['Bleach', 'Demon Slayer', 'Attack on Titan', 'Death Note'],
correct: 'Attack on Titan'
},
{
question: 'What notebook can kill people in Death Note?',
answers: ['Magic Book', 'Death Note', 'Dark Journal', 'Shadow Book'],
correct: 'Death Note'
},
{
question: 'Who is the main character of Demon Slayer?',
answers: ['Tanjiro', 'Zenitsu', 'Inosuke', 'Rengoku'],
correct: 'Tanjiro'
},
{
question: 'What is Naruto’s last name?',
answers: ['Uchiha', 'Hyuga', 'Uzumaki', 'Hatake'],
correct: 'Uzumaki'
},
{
question: 'In Pokémon, who is Pikachu’s trainer?',
answers: ['Brock', 'Ash', 'Gary', 'Misty'],
correct: 'Ash'
},
{
question: 'Which anime has a hero school called U.A. High?',
answers: ['Blue Lock', 'One Punch Man', 'MY Hero Academia', 'Tokyo Ghoul'],
correct: 'My Hero Academia'
},
{
question: 'What is the name of the strongest swordsman in One Piece?',
answers: ['Zoro', 'Mihawk', 'Shanks', 'Sanji'],
correct: 'Mihawk'
},
]
};

function showScreen(screen) {

  startScreen.classList.remove('active');
  categoryScreen.classList.remove('active');
  quizScreen.classList.remove('active');
  resultScreen.classList.remove('active');

  screen.classList.add('active');
}

homeNav.addEventListener('click', () => {
  showScreen(startScreen);
});

categoryNav.addEventListener('click', () => {
  showScreen(categoryScreen);
});

continueBtn.addEventListener('click', () => {

  playerName =
    document.getElementById('playerName').value.trim();

  if (!playerName) {
    alert('Please enter your name first.');
    return;
  }

  showScreen(categoryScreen);
});

categoryBtns.forEach(btn => {

  btn.addEventListener('click', () => {

    currentCategory = btn.dataset.category;

    currentQuestion = 0;
    score = 0;
    summary = [];

    showScreen(quizScreen);

    loadQuestion();
  });
});


function loadQuestion() {

  clearInterval(timer);

  const current =
    questions[currentCategory][currentQuestion];

  selectedAnswer = null;

  nextBtn.disabled = true;

  questionText.textContent = current.question;

  questionCount.textContent = currentQuestion + 1;

  progressBar.style.width =
    ((currentQuestion + 1) /
    questions[currentCategory].length) * 100 + '%';

  answersContainer.innerHTML = '';

  current.answers.forEach(answer => {
    createAnswerButton(answer, current);
  });

  startTimer();
}


function createAnswerButton(answer, current) {

  const button = document.createElement('button');

  button.className = 'answer-btn';

  button.textContent = answer;

  button.addEventListener('click', () => {
    handleAnswer(button, answer, current);
  });

  answersContainer.appendChild(button);
}


function handleAnswer(button, answer, current) {

  disableAllAnswers();

  selectedAnswer = answer;

  nextBtn.disabled = false;

  const isCorrect = answer === current.correct;

  if (isCorrect) {

    button.classList.add('correct');

    score++;

  } else {

    button.classList.add('wrong');

    highlightCorrectAnswer(current.correct);
  }

  summary.push({
    question: current.question,
    selected: answer,
    correct: current.correct,
    isCorrect: isCorrect
  });

  clearInterval(timer);
}


function disableAllAnswers() {

  document.querySelectorAll('.answer-btn')
  .forEach(btn => {
    btn.disabled = true;
  });
}


function highlightCorrectAnswer(correct) {

  document.querySelectorAll('.answer-btn')
  .forEach(btn => {

    if (btn.textContent === correct) {
      btn.classList.add('correct');
    }
  });
}


function startTimer() {

  timeLeft = 10;

  timerDisplay.textContent = timeLeft;

  timer = setInterval(() => {

    timeLeft--;

    timerDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {

      clearInterval(timer);

      summary.push({
        question: questions[currentCategory][currentQuestion].question,
        selected: 'No Answer',
        correct: questions[currentCategory][currentQuestion].correct,
        isCorrect: false
      });

      nextQuestion();
    }

  }, 1000);
}


function nextQuestion() {

  currentQuestion++;

  if (currentQuestion <
    questions[currentCategory].length) {

    loadQuestion();

  } else {

    showResults();
  }
}

nextBtn.addEventListener('click', nextQuestion);

skipBtn.addEventListener('click', nextQuestion);

function showResults() {

  showScreen(resultScreen);

  finalScore.textContent = score;

  playerResultName.textContent =
    'Player: ' + (playerName || 'Unknown');

  const total =
    questions[currentCategory].length;

  if (score === total) {

    performanceMessage.textContent =
      'Perfect score!';

  } else if (score > 0) {

    performanceMessage.textContent =
      'Good job!';

  } else {

    performanceMessage.textContent =
      'Try again!';
  }

  summaryList.innerHTML = '';

  summary.forEach(item => {

    const div = document.createElement('div');

    div.className =
      item.isCorrect
      ? 'summary-item'
      : 'summary-item wrong';

    div.innerHTML = `
      <p>${item.question}</p>

      <p>Your Answer: ${item.selected}</p>

      <p>Correct Answer: ${item.correct}</p>
    `;

    summaryList.appendChild(div);
  });
}


restartBtn.addEventListener('click', () => {

  clearInterval(timer);

  showScreen(startScreen);

});