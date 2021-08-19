import icons from 'url:../../img/icons.svg';
import Views from './views';
class PaginationView extends Views {
  data;
  parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );
    const curPage = this.data.page;

    //page 1 and there are other pages

    if (curPage === 1 && numPages > 1)
      return `
  <button class="btn--inline pagination__btn--next">
    <span>page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    //page 1 and there is no other pages
    if (curPage === 1 && numPages === 1) return;
    //page between above 1
    if (curPage > 1 && numPages > curPage)
      return ` <button class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>page ${curPage - 1}</span>
</button>
<button class="btn--inline pagination__btn--next">
    <span>page ${curPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    if (curPage > 1 && numPages === curPage)
      return `<button class="btn--inline pagination__btn--prev">
  <svg class="search__icon">
    <use href="${icons}#icon-arrow-left"></use>
  </svg>
  <span>page ${curPage - 1}</span>
</button>`;
  }
  PageHandler(handler) {
    //const prevBtn = document.querySelector('.pagination__btn--prev');
    //console.log('hello');
    //if (!prevBtn) return;

    document
      .querySelector('.search-results')
      .addEventListener('click', handler);
  }
}
export default new PaginationView();
