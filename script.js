let startBtn = document.querySelector('.start'),
    startWrapper = document.querySelector('.start-wrapper'),
    wrapperGame = document.querySelector('.wrapper-game'),
    word = document.querySelector('.word'),
    letters = document.querySelectorAll('.letter'),
    timer = document.querySelector('.timer'),
    score = document.querySelector('.score'), 
    newGame = document.querySelector('.newGame'),
    allWords = document.querySelector('.wrapper p'),
    modal = document.querySelector('.modal'),
    wonTime = document.querySelector('.wonTime'),
    wonScore = document.querySelector('.wonScore'),
    canvas = document.querySelector('#canvas'),
    title = document.querySelector('.title');

let data = ['nazarbek', 'shohruzbek', 'amirxon', 'hojiakbar', 'dilbek', 'davronbek', 'zulfiqor', 'abror', 'xurshid', 'umidjon', 'azizbek', 'oybek', 'zahrooo'];

let randomWords = data[Math.floor(Math.random()*data.length)];
console.log(randomWords);

let second = 0;
let minute = 0;
let interval;
let scoreCount = 0;

data.forEach(item => {
    allWords.innerHTML += " " + item + ","
})

startBtn.addEventListener('click', () => {
    startWrapper.style.display = 'none';    
    wrapperGame.style.display = 'flex'
    interval = setInterval(() => {
        timer.innerHTML = `${minute}m ${second}s`
        second++
        if (second == 60) {
            second = 0;
            minute++
            timer.innerHTML = `${minute}m ${second}s`
        }
    }, 1000)
});
newGame.addEventListener('click', () => {
    modal.classList.remove('active');
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    letters.forEach(item => {
        item.style.visibility = 'visible'
    })
    data = ['nazarbek', 'shohruzbek', 'amirxon', 'hojiakbar', 'dilbek', 'davronbek', 'zulfiqor', 'abror', 'xurshid', 'umidjon', 'azizbek', 'oybek', 'zahrooo'];

    randomWords = data[Math.floor(Math.random()*data.length)];
    console.log(randomWords);
    // startWrapper.style.display = 'none';    
    // wrapperGame.style.display = 'flex'
    second = 0;
    minute = 0;
    scoreCount = 0;
    score.innerHTML = scoreCount
    timer.innerHTML = 0;
    clearInterval(interval);
    interval = setInterval(() => {
        timer.innerHTML = `${minute}m ${second}s`
        second++
        if (second == 60) {
            second = 0;
            minute++
            timer.innerHTML = `${minute}m ${second}s`
        }
    }, 1000)
    let i = randomWords.length;
    let count = 0;
    word.innerHTML = ''
    for (; i > 0; i--) {
        word.innerHTML += `<div class="box box${count}"></div>`
        count += 1 
    }
});

let i = randomWords.length;
let count = 0;
for (; i > 0; i--) {
    word.innerHTML += `<div class="box box${count}"></div>`
    count += 1 
}

let complete = [];
let wrongCount = 1;

letters.forEach(item => {
    item.addEventListener('click', () => {
        console.log(wrongCount);
        item.style.visibility = 'hidden'
        let letter = item.attributes.data.nodeValue;
        let letterPlace = randomWords.indexOf(letter.toLowerCase());
        let letterPlace2 = randomWords.lastIndexOf(letter.toLowerCase());
        if (letterPlace == '-1' || letterPlace2 == '-1'){
            scoreCount = scoreCount - 100
            score.innerHTML = scoreCount
            if (letter == 'A' || letter == 'E' || letter == 'I' || letter == 'O' || letter == 'U') { 
            }else{
                switch(wrongCount) {
                    case 1:
                        // canvas.style.display = 'block';
                        drawLine([10, 180], [60, 180], canvas) // 1 line
                        break;
                    case 2: 
                        drawLine([20, 30], [20, 180], canvas) // 2 line
                        break;
                    case 3:
                        drawLine([19, 30], [150, 30], canvas) // 3 line
                        break;
                    case 4: 
                        drawCircle([130, 60], 10, canvas) // head
                        break;
                    case 5:
                        drawLine([130, 69], [130, 110], canvas) // body
                        break;
                    case 6: 
                        drawLine([130, 110], [110, 140], canvas) // left leg
                        break;
                    case 7:
                        drawLine([130, 110], [150, 140], canvas) // right leg
                        break;
                    case 8: 
                        drawLine([130, 80], [110, 100], canvas) // left hand
                        break;
                    case 9:
                        drawLine([130, 80], [150, 100], canvas) // right hand
                        break;
                    case 10:
                        drawLine([130, 30], [130, 50], canvas) // 4 line
                        setTimeout(() => {
                            canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
                            drawLine([10, 180], [60, 180], canvas) // 1 line
                            drawLine([20, 30], [20, 180], canvas) // 2 line
                            drawLine([19, 30], [150, 30], canvas) // 3 line
                            drawCircle([133, 60], 10, canvas) // head
                            drawLine([130, 69], [130, 110], canvas) // body
                            drawLine([130, 110], [125, 140], canvas) // left leg
                            drawLine([130, 110], [135, 140], canvas) // right leg
                            drawLine([130, 80], [125, 100], canvas) // left hand
                            drawLine([130, 80], [135, 100], canvas) // right hand
                            drawLine([130, 30], [130, 50], canvas) // 4 line
                            drawLine([130, 30], [130, 50], canvas) // 4 line
                            setTimeout(() => {
                                modal.classList.add('active');
                                title.innerHTML = '<span style="color: red">You Lose!</span>'
                                clearInterval(interval);
                                wonTime.innerHTML = `(${randomWords.toLocaleUpperCase()})`
                            }, 1000)
                        }, 100);
                        wrongCount = 0;
                        break;
                }
                wrongCount += 1;
            }
        }else if (letterPlace == letterPlace2){
            let box = document.querySelector('.box'+letterPlace);
            box.innerHTML = letter;
            complete[letterPlace] = letter.toLowerCase()
            scoreCount = scoreCount + 200
            score.innerHTML = scoreCount
        } else{
            let box1 = document.querySelector('.box'+letterPlace);
            let box2 = document.querySelector('.box'+letterPlace2);
            box1.innerHTML = letter; 
            box2.innerHTML = letter;  
            complete[letterPlace] = letter.toLowerCase()
            complete[letterPlace2] = letter.toLowerCase()
            scoreCount = scoreCount + 400
            score.innerHTML = scoreCount
        }
        let completeWord = complete.join("");
        if (randomWords == completeWord) {
            modal.classList.add('active');
            let boxes = document.querySelectorAll('.box');
            title.innerHTML = '<span style="color: green">You Won!</span>'
            wonTime.innerHTML = ''
            wonScore.innerHTML = ''
            wonTime.innerHTML += `<b>Time:</b> ${minute}m ${second - 1}s`
            wonScore.innerHTML += `<b>Score:</b> ${scoreCount}`
            clearInterval(interval);
            boxes.forEach(item => {
                item.classList.add('active')
            });
            complete = []
        }
        // console.log(randomWords.lastIndexOf(letter.toLowerCase()));
    })
});

function drawLine(moveTo, lineTo, canvas) {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'white'
    context.lineWidth = 2
    context.moveTo(...moveTo);
    context.lineTo(...lineTo);
    context.stroke()
}

function drawCircle(moveTo, size, canvas) {
    let context = canvas.getContext('2d');
    context.beginPath();
    context.strokeStyle = 'white'
    context.lineWidth = 2
    context.arc(...moveTo, size, 0, 2 * Math.PI)
    context.stroke()
}