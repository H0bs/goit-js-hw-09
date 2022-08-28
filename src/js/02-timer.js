import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const dateInput = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const minute = document.querySelector('[data-minutes]');
const second = document.querySelector('[data-seconds]');
const valueDates = document.querySelectorAll('.value'); 
const labelDates = document.querySelectorAll('.label');


btn.disabled = true;
let intervalId;

flatpickr(dateInput, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const currentDate = new Date();
        if (selectedDates[0] >= currentDate) {
            btn.disabled = false;
        } else {
            btn.disabled = true;
            Notiflix.Notify.failure('Please choose a date in the future');
        }
    },
});

function startTime() {  
    btn.disabled = true;
    const selectedDate = Date.parse(dateInput.value);
    intervalId = setInterval(() => {
        const currentDate = new Date();
        const delta = selectedDate - currentDate;
        const { days, hours, minutes, seconds } = convertMs(delta);

        second.textContent = addLeadingZero(seconds);
        minute.textContent = addLeadingZero(minutes);
        hour.textContent = addLeadingZero(hours);
        day.textContent = addLeadingZero(days);
        const totalTime = Number(second.textContent) + Number(minute.textContent) + Number(hour.textContent) + Number(day.textContent)
        if (totalTime <= 0) {
            clearInterval(intervalId);
        }
    }, 1000);
};

function onClickInput() {
    if (intervalId) {
        document.querySelector('.flatpickr-calendar').classList.remove('open');
        Notiflix.Notify.warning('Please reload page');
    }

}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

btn.addEventListener('click', startTime);
dateInput.addEventListener('click', onClickInput);

valueDates.forEach(element => {
    element.style.fontSize = "50px";
    element.style.marginRight = "20px";
});

labelDates.forEach(element => {
    element.style.fontSize = "40px";
});

Notiflix.Notify.init({
    position: 'left-top',
    clickToClose: true
});
