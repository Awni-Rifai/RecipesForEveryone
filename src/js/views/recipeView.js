import icons from 'url:../../img/icons.svg';
import { Fraction } from 'fractional';
import Views from './views';

class RecipeView extends Views {
  parentElement = document.querySelector('.recipe');

  data;
  errorMessage = `We could not find that recipe. Please try another one!`;
  successMessage;

  addHandlerRender(handler) {
    ['hashchange', 'load'].forEach(e => window.addEventListener(e, handler));
  }
  addHandlerUpdateServings(handler) {
    //here the parent element is already available in the html at page load so it will be attached from the begining
    this.parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--tiny');

      if (!btn) return;
      let action;
      if (btn.classList.contains('btn--increase-servings')) action = 'increase';
      if (btn.classList.contains('btn--decrease-servings')) action = 'decrease';

      handler(action);
    });
  }
  _generateMarkup() {
    return ` <figure class="recipe__fig">
    <img src="${this.data.image}" alt="${
      this.data.title
    }" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${this.data.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">${
        this.data.cookingTime
      }</span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">${
        this.data.servings
      }</span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--decrease-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
  <div class="recipe__user-generated ${this.data.key ? '' : 'hidden'}">
    <svg>
    <use href="${icons}#icon-user"></use>
    </svg>
   </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark${
      this.data.bookmarked ? '-fill' : ''
    }"></use>
      </svg>
    </button>
  </div>
  <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._generateMarkupIngredients(this.data.ingredients)}  
    </ul>
  </div>         
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${
        this.data.publisher
      }</span>. Please check out
      directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${this.data.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
  </div>`;
  }
  _generateMarkupIngredients(ingredients) {
    return ingredients
      .map(ingredient => {
        return `<li class="recipe__ingredient">
  <svg class="recipe__icon">
    <use href="${icons}#icon-check"></use>
  </svg>
  <div class="recipe__quantity">${
    ingredient.quantity ? new Fraction(ingredient.quantity).toString() : ''
  }</div>
  <div class="recipe__description">
    <span class="recipe__unit">${ingredient.unit}</span>
   ${ingredient.description}
  </div>
</li>`;
      })
      .join('');
  }

  renderMessage(message = this.successMessage) {
    const markup = `<div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
  }
  bookmarkHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--round');
      if (!btn) return;
      //this is another solution
      /* let bookmarkCheck;
      const bookmarkFill = `${icons}#icon-bookmark-fill`;
      const bookmarkEmpty = `${icons}#icon-bookmark`;
      const el = document.querySelector('.btn--round svg use');
      let bookmarkValue = el.href.baseVal;

      if (bookmarkValue === bookmarkFill) {
        bookmarkCheck = true;
        el.href.baseVal = bookmarkEmpty;
      }
      if (bookmarkValue === bookmarkEmpty) {
        bookmarkCheck = false;
        el.href.baseVal = bookmarkFill;
      }*/
      handler();
    });
  }
}
export default new RecipeView();
