const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;

const onClickStart = () => {
    if (startBtn.disabled) {
        return;
    }
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtn.disabled = true;
}

const onClickStop = () => {
    clearTimeout(timerId);
    startBtn.disabled = false;
}

const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

startBtn.addEventListener('click', onClickStart);
stopBtn.addEventListener('click', onClickStop);