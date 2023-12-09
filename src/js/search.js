// import { Notify } from "notiflix";
// import {
//     foodInfo,
//     fetchAndRender,
//     fetchFoodCategory,
//     getCategoriesFromLS,
//     KEY_CATEGORY,
//     renderFoodItems,
//   } from './products';
// import { Input } from "postcss";

// const form = document.getElementById('myForm');
// const input = document.querySelector('.search-input')
// let timeoutId; // Змінна для зберігання ідентифікатора таймаута

// // Додавання слухача подій до форми
// input.addEventListener('input', handleInputOrSubmit);
// form.addEventListener('submit', handleInputOrSubmit);

// function handleInputOrSubmit(event) {

//   event.preventDefault();

//   const keyword = event.target.elements.searchInput.value;
//   console.log(keyword);

//   // Визначення типу події
//   if (event.type === 'input') {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => {
//       console.log('Input event after 0.3 second delay');
//     }, 1000);
//   } else if (event.type === 'submit') {
//     console.log('Submit event triggered');
//   }

//   if (storedData) {
//     try {
//         // Розпакувати JSON-рядок у Javascript-об'єкт
//         const parsedData = JSON.parse(storedData);
//         // Змінити тільки потрібну властивість (наприклад, keyword)
//         parsedData.keyword = `${keyword}`;

//         // Зберегти оновлений об'єкт назад в localStorage
//         localStorage.setItem('filter', JSON.stringify(parsedData));
//     } catch (error) {
//         console.error('Error updating localStorage:', error);
//     }
// }
//     fetchAndRender();
// }

// // Слухач на форму
// // По інпуту/сабміту = додаємо в ЛокалСторадж
// // виклик handleSubmit
// // fetchAndRender