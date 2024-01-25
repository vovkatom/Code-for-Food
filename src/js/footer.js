import axios from 'axios';
import { save, load } from './filters-localstorage';
import throttle from 'lodash.throttle';

const refs = {
  formElem: document.querySelector('.subscription-form'),
  closeModalSuccessBtn: document.querySelector(
    '.subscription-success-close-button'
  ),
  closeModalAlreadyBtn: document.querySelector(
    '.subscription-already-close-button'
  ),
  closeModalFailBtn: document.querySelector(
    '.subscription-fail-close-button'
  ),
  modal: document.querySelector('.subscription-alert'),
  subAlready: document.querySelector('.subscription-already-subscribed'),
  subSuccess: document.querySelector('.subscription-success'),
  subFail: document.querySelector('.subscription-fail'),
};

refs.formElem.addEventListener('submit', onFormSubmit);
refs.closeModalSuccessBtn.addEventListener('click', toggleModal);
refs.closeModalAlreadyBtn.addEventListener('click', toggleModal);
refs.closeModalFailBtn.addEventListener('click', toggleModal);
refs.formElem.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(event) {
  const emailValue = refs.formElem.elements.email.value;
  const value = emailValue;
  const key = 'subscription-form-email';
  save(key, value);
}

function onPageLoad() {
    const emailValue = load('subscription-form-email');
    refs.formElem.elements.email.value = emailValue || '';
}
onPageLoad();

async function onFormSubmit(event) {
    event.preventDefault();
    
  const email = refs.formElem.elements.email.value;
  const newEmail = {
    email: `${email}`,
    };
    
  try {
    const response = await axios.post(
      'https://food-boutique.b.goit.study/api/subscription',
      newEmail
    );
    // Якщо запит успішний, викликаємо toggleModal()
      toggleModal();
      refs.subSuccess.style.display = 'block';
      refs.formElem.reset()
  } catch (err) {
    if (err.response && err.response.status === 409) {
      // Якщо статус 409, викликаємо toggleModal()
        toggleModal();
        refs.subAlready.style.display = 'block';
        refs.formElem.reset();
    } else {
      toggleModal();
      refs.subFail.style.display = 'block';
    }
  }
}

function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.subSuccess.style.display = 'none';
    refs.subAlready.style.display = 'none';
    refs.subFail.style.display = 'none';
  }