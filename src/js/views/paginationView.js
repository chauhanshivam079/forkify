import icons from 'url:../../img/icons.svg';

import View from './view.js';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClicks(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }
  _generateRightMarkupButton(currentPage) {
    return `
      <button data-goto="${
        currentPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
            </svg>
      </button>
    `;
  }
  _generateLeftMarkupButton(currentPage) {
    return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
        </button>
    `;
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page1 and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateRightMarkupButton(currentPage);
    }
    // last page
    if (currentPage === numPages && numPages > 1) {
      return this._generateLeftMarkupButton(currentPage);
    }
    //other pages
    if (currentPage < numPages) {
      return `
        ${this._generateLeftMarkupButton(
          currentPage
        )}${this._generateRightMarkupButton(currentPage)}
      `;
    }
    // Page1 and there are no other pages
    return '';
  }
}

export default new paginationView();
