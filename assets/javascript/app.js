
   
   
var questions = [{
  question :"Which inventor developed the solid-body electric guitar that made rock 'n roll possible?",
  answers : ["Les Paul", "Jerry Garcia" ," Mike Bloomfield"," Eric Clapton,"],
  correctAnswer :"Les Paul",
  image : "./assets/images/paul.jpg",
},
{
  question :"What is the full name of Australian boyband 5SOS?",
  answers : ["All Time Low"," My Chemical Romance"," 5 Seconds of Summer"," Sounds Good Feels Good"],
  correctAnswer :" 5 Seconds of Summer",
  image : "./assets/images/5 Seconds of Summer.jpg",
},
{
  question : "Which electronic musical instrument emits the eeriest of sounds and is the only instrument played without touching it?",
  answers : ["Trautonium","Theremin","Ondes-Martenot","Croix Sonore"],
  correctAnswer : "Theremin",
  image : "./assets/images/theremin.jpg"
},
{
  question :"Which member of an acting family dated Taylor Swift, and is rumored to be the ex in her song, 'We Are Never Getting Back Together'?",
  answers : ["Jake Gyllenhaal"," Denis Villeneuve"," Peter Travers ","Jeff Bauman"],
  correctAnswer:"Jake Gyllenhaal",
  image : "./assets/images/jake.jpg"
},
{
  question :"How many keys are on most baby grand pianos?",
  answers :[ "90", "70","88","101"],
  correctAnswer:"88",
  image : "./assets/images/piano.jpg"
},
{
  question :"Which one of Prince's songs reached highest on the music charts?",
  answers : ["Dancing in the Dark","Like a Rolling Stone","Like a Rolling Stone","When Dove's Cry"],
  correctAnswer :"When Dove's Cry",
  image :"./assets/images/cry.jpg"
}
];

var main = $('#gamearea');
var startTimer = 30;




var triviagame = {
questions:questions,
nowAsk:0,
counter:startTimer,
correct:0,
incorrect:0,
countdown: function(){
  triviagame.counter--;
  $('#counter-number').html(triviagame.counter);

  if (triviagame.counter === 0){
    console.log('TIME UP');
    triviagame.timeUp();
  }
},
pickQuestion: function(){
  timer = setInterval(triviagame.countdown, 1000);
  main.html('<h2>' + questions[this.nowAsk].question + '</h2>' );
  for (var i = 0; i<questions[this.nowAsk].answers.length; i++){
    main.append('<button class="answer-button" id="button"' + 'data-name="' + questions[this.nowAsk].answers[i] + '">' + questions[this.nowAsk].answers[i]+ '</button><br><br>');
    
  }
},
nextQuestion: function(){
  triviagame.counter =startTimer;
  $('#counter-number').html(triviagame.counter);
  triviagame.nowAsk++;
  triviagame.pickQuestion();
},
timeUp: function (){
  clearInterval(timer);
  $('#counter-number').html(triviagame.counter);

  main.html('<h2>You Are Out Of Time!</h2>');
  main.append('<h3>The Correct Answer Was: ' + questions[this.nowAsk].correctAnswer);
  main.append('<img  id="answerimg" src="' + questions[this.nowAsk].image + '" />');

  if (triviagame.nowAsk === questions.length - 1){
    setTimeout(triviagame.results, 3 * 1000);
  } else {
    setTimeout(triviagame.nextQuestion, 3 * 1000);
  }
},
results: function() {
  clearInterval(timer);

  main.html('<h2>Game Finish!!, heres your result!</h2>');
  $('#counter-number').html(triviagame.counter);
  main.append('<h3>Correct Answers: ' + triviagame.correct + '</h3>');
  main.append('<h3>Incorrect Answers: ' + triviagame.incorrect + '</h3>');
  main.append('<h3>Unanswered: ' + (questions.length - (triviagame.incorrect + triviagame.correct)) + '</h3>');
  main.append('<br><button id="start-again">Start Again?</button>');
},
clicked: function(e) {
  clearInterval(timer);

  if ($(e.target).data("name") === questions[this.nowAsk].correctAnswer){
    clearInterval(timer);
    triviagame.correct++;
    main.html('<h2>Correct Answer!</h2>');
    main.append('<img id="answerimg" src="' + questions[triviagame.nowAsk].image + '" />');

    if (triviagame.nowAsk === questions.length - 1){
      setTimeout(triviagame.results, 3 * 1000);
    } else {
      setTimeout(triviagame.nextQuestion, 3 * 1000);
    }
    }
   else {
    triviagame.incorrect++;
    clearInterval(timer);
    main.html('<h2>Incorrect Answer!</h2>');
    main.append('<h3>The Correct Answer was: ' + questions[triviagame.nowAsk].correctAnswer + '</h3>');
    main.append('<img id="answerimg" src="' + questions[triviagame.nowAsk].image + '" />');

    if (triviagame.nowAsk === questions.length - 1){
      setTimeout(triviagame.results, 3 * 1000);
    } else {
      setTimeout(triviagame.nextQuestion, 3 * 1000);
  }
}
},

reset: function(){
  this.nowAsk= 0;
  this.counter = startTimer;
  this.correct = 0;
  this.incorrect = 0;
  this.pickQuestion();
}
};

$(document).on('click', '#start-again', function(e) {
triviagame.reset();
});

$(document).on('click', '.answer-button', function(e) {
triviagame.clicked(e);
});

$(document).on('click', '#start', function(e) {
$('#subwrapper').prepend('<h2>Time Remaining: <span id="counter-number">30</span> Seconds</h2>');
triviagame.pickQuestion();
});