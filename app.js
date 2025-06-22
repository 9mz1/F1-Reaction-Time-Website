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
    // console.log(delay);
    return delay;
}

function startTimer() {
    lights.forEach((light) => {
        light.classList.add('active');
    })
    info.textContent = 'CLICK NOW'
    startTime = performance.now();
    timerStarted = true;
    waitingForGreen = false
}

function calculateReaction() {
    contentContainer.removeEventListener('click', main);
    endTime = performance.now();
    reactionTime = (endTime - startTime).toFixed(1);

    if (parseFloat(bestReactionTime) == 0 || parseFloat(reactionTime) < parseFloat(bestReactionTime)) {
        bestReactionTime = reactionTime;
        info.textContent = 'New Record';
    }

    timeText.textContent = `${reactionTime}ms`;
    bestTimeText.textContent = `Best Time - ${bestReactionTime}ms`;
    // console.log(typeof bestReactionTime);
    // console.log(typeof reactionTime);
    // console.log(`reaction time: ${reactionTime}`);
    contentContainer.addEventListener('click', reset);
}

function reset() {
    contentContainer.removeEventListener('click', reset);
    setTimeout(() => {
        lights.forEach((light) => {
            light.classList.remove('active');
        })
        timerStarted = false;
        waitingForGreen = false;
        startTime = 0;
        endTime = 0;
        reactionTime = 0;

        info.textContent = 'Click To Start';
        contentContainer.addEventListener('click', main);
    }, 100)
}

function main() {
    if (!waitingForGreen && !timerStarted) {
        info.textContent = 'Get Ready';
        waitingForGreen = true;
        timeOut = setTimeout(() => {
            startTimer();
            // console.log('started');
        }, startDelay());
    } else if (waitingForGreen && !timerStarted) {
        info.textContent = 'Jump Start';
        // console.log('jumpStart');
        clearTimeout(timeOut);
        reset();
    } else if (timerStarted) {
        calculateReaction();
    }
}

contentContainer.addEventListener('click', main);