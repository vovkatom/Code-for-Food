import throttle from 'lodash.throttle';

// Отримання посилання на елемент кнопки прокрутки вгору за класом CSS '.scroll-up'
const ScrollUpBtn = document.querySelector('.scroll-up');

// Додаємо слухача подій 'scroll' на вікно і викликаємо функцію scrollTracker з обмеженням через throttle на 400 мс
document.addEventListener('scroll', throttle(scrollTracker, 400));

// Оголошення функції scrollTracker, яка відслідковує прокрутку сторінки
function scrollTracker() {
  // Отримання відстані, на яку сторінка була прокручена від верху
  const scrolled = window.scrollY;

  // Отримання висоти видимої частини вікна браузера
  const coords = document.documentElement.clientHeight;

  // Перевірка, чи сторінка прокручена на більшу відстань, ніж висота видимої частини вікна
  if (scrolled > coords) {
    // Якщо умова виконується, додаємо клас 'scroll-up-is-hidden', щоб приховати кнопку прокрутки вгору
    ScrollUpBtn.classList.add('scroll-up-is-hidden');
  } else {
    // Якщо умова не виконується, видаляємо клас 'scroll-up-is-hidden', щоб показати кнопку прокрутки вгору
    ScrollUpBtn.classList.remove('scroll-up-is-hidden');
  }
}
