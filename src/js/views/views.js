import icons from 'url:../../img/icons.svg';
export default class Views {
  renderSpinner() {
    const markup = `<div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
      </div>`;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  // removeSpinner() {
  //   document.querySelector('.spinner').remove();
  // }
  /**
   *
   * @param {Object | Object[]} data (The data to be rendered on the dom (eg:recipe))
   * @returns undefined
   * @author Awni Rifai
   * @this{Object} View instance
   */
  render(data) {
    if (!data || data.length === 0) return this.renderError();
    this.data = data;

    const markup = this._generateMarkup();

    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  _clear() {
    //this.parentElement.value = '';
    this.parentElement.innerHTML = '';
  }
  renderError(err = this.errorMessage) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${err}</p>
  </div> -->`;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `<div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
    this._clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    if (!data || data.length === 0) return this.renderError();
    this.data = data;

    const newMarkup = this._generateMarkup();
    //we will convert this markup to a virtual dom object
    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this.parentElement.querySelectorAll('*'));
    newElement.forEach((newEL, i) => {
      const curEl = curElement[i];

      if (
        !newEL.isEqualNode(curEl) &&
        newEL.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEL.textContent;
      }
      //update changed attributes
      if (!newEL.isEqualNode(curEl)) {
        Array.from(newEL.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }
}
