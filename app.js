const contentContainer = document.querySelector('.content-container');
const lights = document.querySelectorAll('.light');
const info = document.querySelector('#info');
const bestTimeText = document.querySelector('#best-time');
const timeText = document.querySelector('#time');

let timerStarted = false;
let waitingForGreen = false;
let startTime;
let endTime;
let reactionTime;
let bestReactionTime = 0;

function startDelay() {
    let delay = Math.floor(300 + Math.random() * 600);
    console.log(delay);
    return delay;
}

function startTimer() {
    lights.forEach((light) => {
        light.classList.add('active');
    })
    startTime = performance.now();
    timerStarted = true;
    waitingForGreen = false
}

function calculateReaction() {
    endTime = performance.now();
    reactionTime = (endTime - startTime).toFixed(1);

    if (bestReactionTime == 0 || reactionTime < bestReactionTime) {
        bestReactionTime = reactionTime;
    }

    console.log(bestReactionTime);
    console.log(`reaction time: ${reactionTime}`);
}

function reset() {
    setTimeout(() => {
        lights.forEach((light) => {
            light.classList.remove('active');
        })
        timerStarted = false;
        waitingForGreen = false;
        startTime = 0;
        endTime = 0;
        reactionTime = 0;
    }, 1500)
}

function main() {
    if (!waitingForGreen && !timerStarted) {
        waitingForGreen = true;
        timeOut = setTimeout(() => {
            startTimer();
            console.log('started');
        }, startDelay());
        reset();
    } else if (waitingForGreen && !timerStarted) {
        console.log('jumpStart');
        clearTimeout(timeOut);
        reset();
    } else if (timerStarted) {
        calculateReaction();
        reset();
    }
}

contentContainer.addEventListener('click', main);