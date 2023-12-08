import 'tui-pagination/dist/tui-pagination.css';
import Pagination from 'tui-pagination';
import { fetchAndRender } from '/js/products.js';

const FILTER = 'filter';

const refs = {
  pagination: document.querySelector('.tui-pagination'),
  list: document.querySelector('.product-list'),
};

// refs.searchForm.addEventListener('submit', onSubmit);

const container = document.getElementById('pagination');

const itemsPerPage = 20;
// const totalItems = 100;

const options = {
  totalItems: 1000,
  itemsPerPage: itemsPerPage,
  visiblePages: 5,
  page: 1,
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

// function onSubmit(event) {
//   pagination.reset();
// }

const pagination = new Pagination(container, options);

function loadMoreTrendMoves(event) {
  const storedData = localStorage.getItem(FILTER);
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      parsedData.page = `${event.page}`;
      localStorage.setItem('filter', JSON.stringify(parsedData));
    } catch (error) {
      console.error('Error updating localStorage:', error);
    }
  }
  refs.list.innerHTML = '';
  fetchAndRender();
}

pagination.on('beforeMove', loadMoreTrendMoves);
