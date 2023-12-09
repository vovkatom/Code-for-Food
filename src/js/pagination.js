// import 'tui-pagination/dist/tui-pagination.css';
// import Pagination from 'tui-pagination';
// import { fetchAndRender, fetchFoodCategory } from '../js/products.js';

// const FILTER = 'filter';

// const refs = {
//   pagination: document.querySelector('.tui-pagination'),
//   list: document.querySelector('.product-list'),
//   select: document.querySelector('.select'),
// };

// const container = document.getElementById('pagination');

// const itemsPerPage = 6;
// let pageOrigin = 1;
// const storedData = localStorage.getItem(FILTER);
// if (storedData) {
//   try {
//     const parsedData = JSON.parse(storedData);
//     pageOrigin = parsedData.page;
//   } catch (error) {
//     console.error('Error updating localStorage:', error);
//   }
// }
// let responce = fetchFoodCategory();
// let totalPage = responce.data.totalPages;

// let options = {
//   totalItems: totalPage,
//   itemsPerPage: itemsPerPage,
//   visiblePages: 5,
//   page: pageOrigin,
//   centerAlign: true,
//   firstItemClassName: 'tui-first-child',
//   lastItemClassName: 'tui-last-child',
//   template: {
//     page: '<a href="#" class="tui-page-btn">{{page}}</a>',
//     currentPage:
//       '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
//     moveButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</a>',
//     disabledMoveButton:
//       '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
//       '<span class="tui-ico-{{type}}">{{type}}</span>' +
//       '</span>',
//     moreButton:
//       '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
//       '<span class="tui-ico-ellip">...</span>' +
//       '</a>',
//   },
// };

// const pagination = new Pagination(container, options);

// refs.select.addEventListener('click', onSubmit);

// async function onSubmit(event) {
//   // pagination.reset();
//   const storedData = localStorage.getItem(FILTER);
//   if (storedData) {
//     try {
//       const parsedData = JSON.parse(storedData);
//       parsedData.page = 1;
//       localStorage.setItem('filter', JSON.stringify(parsedData));
//     } catch (error) {
//       console.error('Error updating localStorage:', error);
//     }
//   }
//   let responce = fetchFoodCategory();
//   options.totalItems = responce.data.totalPages;
//   const pagination = new Pagination(container, options);
// }

// function loadMoreTrendMoves(event) {
//   const storedData = localStorage.getItem(FILTER);
//   if (storedData) {
//     try {
//       const parsedData = JSON.parse(storedData);
//       parsedData.page = Number(`${event.page}`);
//       localStorage.setItem('filter', JSON.stringify(parsedData));
//     } catch (error) {
//       console.error('Error updating localStorage:', error);
//     }
//   }
//   refs.list.innerHTML = '';
//   fetchAndRender();
// }

// pagination.on('beforeMove', loadMoreTrendMoves);
