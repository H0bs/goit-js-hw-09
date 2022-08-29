import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const form = document.querySelector('.form');
const delay = document.querySelector('[name="delay"]');
const step = document.querySelector('[name="step"]');
const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);

  setTimeout(() => {
    for (let position = 0; position < amount; position++) {
    
      setTimeout(() => {
        createPromise(position, delay + position*step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position+1} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position+1} in ${delay}ms`);
        });
      }, step);
    } 
  }, delay);
})

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  })
}
