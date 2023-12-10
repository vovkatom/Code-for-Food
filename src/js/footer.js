import axios from 'axios';
import { save, load } from './filters-localstorage';

const refs = {
  formElem: document.querySelector('.subscription-form'),
  closeModalBtn: document.querySelector('.subscription-close-button'),
  modal: document.querySelector('.subscription-alert'),
  subAlready: document.querySelector('.subscription-already-subscribed'),
  subSuccess: document.querySelector('.subscription-success'),
  subFail: document.querySelector('.subscription-fail'),
};

refs.formElem.addEventListener('submit', onFormSubmit);
refs.closeModalBtn.addEventListener('click', toggleModal);

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
  } catch (err) {
    if (err.response && err.response.status === 409) {
      // Якщо статус 409, викликаємо toggleModal()
        toggleModal();
        refs.subAlready.style.display = 'block';
    } else {
      toggleModal();
      refs.subFail.style.display = 'block';
      console.error('Помилка при відправці запиту:', err);
    }
  }
}

function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
    refs.subSuccess.style.display = 'none';
    refs.subAlready.style.display = 'none';
    refs.subFail.style.display = 'none';
  }