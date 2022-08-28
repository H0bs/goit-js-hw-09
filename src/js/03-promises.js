import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const form = document.querySelector('.form');
// const delay = document.querySelector('[name="delay"]');
// const step = document.querySelector('[name="step"]');
// const amount = document.querySelector('[name="amount"]');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const delay = formElements.delay.value;
  const step = formElements.step.value;
  const amount = formElements.amount.value;

  setTimeout(() => {
    for (let position = 1; position <= amount; position++) {
    
      setTimeout(() => {
        createPromise(position, position*step)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
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
