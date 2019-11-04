const STORE = [
    {
        question:'In Norse Mythology who is the ruler of Asgard?',
        answers:    [
            'Vili',
            'Thor',
            'Odin',
            'Hel'
        ],
        correctAnswer: 'Odin'

    },
    {
        question: 'What is the name of the Norse hero responsible for slaying the dragon Fafnir?',
        answers:    [
            'Sigmond',
            'Beowulf',
            'Siegfried',
            'Sleipnir'
        ],
        correctAnswer: 'Siegfried'

    },
    {
        question: "Odin's ravens fly all over the world bringing him information every day, what are thier names?",
        answers: [
            'Vil and Vili',
            'Huginn and Muninn',
            'Hagbard and Signy',
            'Geri and Freki'
        ],
        correctAnswer: 'Huginn and Muninn'

    },
    {
        question: "What is the name of Heimdallr's Horn?",
        answers: [
            'Gungnir',
            'Gjallarhorn',
            'Mjölnir',
            'Sumarbrandr'
        ],
        correctAnswer: 'Gjallarhorn'

    },
    {
        question: "When Ragnarok comes, what event will signal its start?",
        answers: [
            'The destruction of Asgard',
            'Fimbulvetr',
            'Jörmungandr, the wold serpent, releases his tail',
            'Yggdrasil shakes'
        ],
        correctAnswer: 'Jörmungandr, the wold serpent, releases his tail'

    }
];

let score = 0;
let questionNum = 0;

function questionGenerator() {
    if (questionNum < STORE.length) {
        return createForm(questionNum);
    }else{
        $('.question').hide();
        finalScore();
        $('questionNum').text(5);
    }
}

function scoreUpdater() {
    score++;
    $('.score').text(score);
}

function questionNumUpdater(){
    questionNum++;
    $('.questionNum').text(questionNum + 1);
}

function quizInfoReset() {
    score = 0;
    questionNum = 0;
    $('.score').text(0);
    $('.questionNum').text(0);
}

function quizStart() {
    $('.boxAlt').hide();
    $('.start').on('click', '.startButton', function (event) {
        $('.start').hide();
        $('.questionNum').text(1);
        $('.question').show();
        $('.question').prepend(questionGenerator());
    });
}

function submitAnswer() {
    $('.quizBorder').on('submit', function (event) {
        event.preventDefault();
        $('.boxAlt').hide();
        $('.respond').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNum].correctAnswer;
        if (answer == correct) {
            correctAnswer();
        }else {
            wrongAnswer();
        }
    });
}

function createForm(questionIndex) {
    let questionForm = $(`<form>
        <fieldset>
            <legend class = "questionText">${STORE[questionIndex].question}</legend>
        </fieldset>
    </form>`)

    let formField = $(questionForm).find('fieldset');

    STORE[questionIndex].answers.forEach(function(answerVal, answerInd){
        $(`<label class="trackerBar" for="${answerInd}">
            <input class="radio" type="radio"
            id="${answerInd}" value=${answerVal}" name="answer" required>
            <span>${answerVal}</span>
        </label>`).appendTo(formField);
    });
    $(`<button type="submit" class="submitButton button">Submit</button>`).appendTo(formField);
    return questionForm;
}

function correctAnswer() {
    $('.respond').html(
        `<h3>That's the right answer!</h3>
        <img src="Images/Ravens.jpg" alt="Huginn and Muninn" class="photos" width="200px">
        <p class="trackerBar">Well Done!</p> 
        <button type="button" class="nextButton button">Next</button>`
    );
    scoreUpdater();
}

function wrongAnswer(){
    $('.respond').html(`<h3>That was the wrong choice.</h3>
    <img src="Images/Ragnarok.png" alt="Ragnarok the end of times." class="photos" width="200px">
    <p class="trackerBar">Here is the right option.</p>
    <p class="trackerBar">${STORE[questionNum].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
    );
}

function nextQ(){
    $('.quizBorder').on('click', '.nextButton',
    function(event){
        $('.boxAlt').hide();
        $('.question').show();
        questionNumUpdater();
        $('.question form').replaceWith(questionGenerator());
    });
}

function finalScore(){
    $('.final').show();

    const pass = [
        'Well Done!',
        'Images/Gjallarhon.jpg',
        'Gjallarhorn',
        'You know your mythology.'
    ];

    const fail = [
        'Try again',
        'Images/Fafnir.jpg',
        'Fafnir being slain.',
        'If you care.'

    ];

    if (score >= 3) {
        array = pass;
    }else {
        array = fail;
    }
    return $('.final').html(
        `<h3>${array[0]}</h3>
        <img src="${array[1]}" alt="${array[2]}" class="photos">
        <h3>Your score is ${score} / 5</h3>
        <p class="trackerBar">${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
    );
}

function quizReset(){
    $('.quizBorder').on('click', '.restartButton', function(event){
        event.preventDefault();
        quizInfoReset();
        $('.boxAlt').hide();
        $('.quizStart').show();
    });
}

function runQuiz(){
    quizStart();
    questionGenerator();
    submitAnswer();
    nextQ();
    quizReset();
}

$(runQuiz);