import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';
import { fetchAndRender, fetchFoodCategory } from '../js/products.js';

const FILTER = 'filter';

const refs = {
  pagination: document.querySelector('.tui-pagination'),
  list: document.querySelector('.product-list'),
  select: document.querySelector('.select'),
};

const container = document.getElementById('pagination');

let totalPage = 1;
//correct
const itemsPerPage = 6;
let visiblePage = 5;
let pageOrigin = 1;

//вытягивает с localStorage номер страницы - если была перегрузка страницы, то нужно вятянуть номер который был до перегрузки и
//  активировать пагинацию на этой же страничке
const storedData = localStorage.getItem(FILTER);
if (storedData) {
  try {
    console.log(storedData);
    const parsedData = JSON.parse(storedData);
    pageOrigin = parsedData.page;
    pages(pageOrigin);
  } catch (error) {
    console.error('Error updating localStorage:', error);
  }
}
// } else {
//   pageOrigin = 1;
// }

//создание пагинации
function funcPagination(totalPage, pageOrigin = 1) {
  // if (totalPage <= 6) {
  //   visiblePage = 0;
  // } else (visiblePage = 5;)

  console.log(totalPage);
  console.log(pageOrigin);
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
  const pagination = new Pagination(container, options);
  if (totalPage <= 1) {
    pagination.reset();
  }
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
  funcPagination(totalPage, pageOrigin);
}

pages(pageOrigin);

//слушатель для смены категории товаров
refs.select.addEventListener('click', onSubmit);

//колбек ф-я для слушателя. В local Storage в параметр page заносим 1. Определяем кол-во товаров и отрисовываем новую пагинацию
async function onSubmit(event) {
  // pagination.reset();
  const storedData = localStorage.getItem(FILTER);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      parsedData.page = 1;
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }

  let responce = await fetchFoodCategory();
  totalPage = responce.data.totalPages * responce.data.perPage;
  let pageOrigin = 1;
  funcPagination(totalPage, pageOrigin);
}
