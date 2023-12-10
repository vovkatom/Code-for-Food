// import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';
import { fetchAndRender, fetchFoodCategory } from '/js/products.js';

export { funcPagination, loadMoreTrendMoves, pages };
  
const FILTER = 'filter';

const refs = {
  pagination: document.querySelector('.tui-pagination'),
  list: document.querySelector('.product-list'),
  // select: document.querySelector('.select'),
  search: document.querySelector('#search'),
};

const container = document.getElementById('pagination');

let totalPage = 1;
//correct
let itemsPerPage;
let visiblePage = 3;
let pageOrigin = 1;

//вытягивает с localStorage номер страницы - если была перегрузка страницы, то нужно вятянуть номер который был до перегрузки и
//  активировать пагинацию на этой же страничке
function storeData() {
  const storedData = localStorage.getItem(FILTER);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      pageOrigin = parsedData.page;
      itemsPerPage = parsedData.limit;
      // console.log(totalPage);
      // console.log(pageOrigin);
      // console.log(itemsPerPage);
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
  funcPagination(totalPage, pageOrigin);
}

// } else {
//   pageOrigin = 1;
// }

//создание пагинации
function funcPagination(totalPage, pageOrigin) {
  // console.log(`"totalPage"${totalPage}`);
  // console.log(`"pageOrigin"${pageOrigin}`);
  // console.log(`"itemsPerPage"${itemsPerPage}`);

  let options = {
    totalItems: totalPage,
    itemsPerPage: itemsPerPage,
    visiblePages: visiblePage,
    page: pageOrigin,
    centerAlign: true,
    firstItemClassName: 'tui-first-child',
    lastItemClassName: 'tui-last-child',
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage:
        '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  };
  // console.log(itemsPerPage);
  const pagination = new Pagination(container, options);
  pagination.on('beforeMove', loadMoreTrendMoves);
}

//в local storage меняем номер странички на выбраный номер в пагинации. Очищяет карточки и заново отрисовывает новые (новая партия)
function loadMoreTrendMoves(event) {
  const storedData = localStorage.getItem(FILTER);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      parsedData.page = Number(`${event.page}`);
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
  refs.list.innerHTML = '';
  fetchAndRender();
}

// определяем сколько всего будет товаров и вызываем пагинацию передавая этот параметр
async function pages(pageOrigin) {
  let responce = await fetchFoodCategory();
  totalPage = responce.data.totalPages * responce.data.perPage;
  // console.log(`fff${totalPage}`);
  
  storeData();
}

pages(pageOrigin);
// window.addEventListener('load', pages)(pageOrigin);

//слушатель для смены категории товаров
// refs.select.addEventListener('click', onSubmit);
// refs.search.addEventListener('input', onSubmit);

// //колбек ф-я для слушателя. В local Storage в параметр page заносим 1. Определяем кол-во товаров и отрисовываем новую пагинацию
// async function onSubmit(event) {
//   // pagination.reset();
//   const storedData = localStorage.getItem(FILTER);
//   if (storedData) {
//     try {
//       const parsedData = JSON.parse(storedData);
//       parsedData.page = 1;
//       localStorage.setItem('filter', JSON.stringify(parsedData));
//     } catch (error) {
//       console.error('Error updating  localStorage:', error);
//     }
//   }

//   let responce = await fetchFoodCategory();
//   let totalPage = responce.data.totalPages * responce.data.perPage;
//   let pageOrigin = 1;
//   funcPagination(totalPage, pageOrigin);
// }

