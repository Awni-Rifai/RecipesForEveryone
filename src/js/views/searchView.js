class SearchView {
  searchElement = document.querySelector('.search__field');
  searchBtn = document.querySelector('.search__btn');
  searchHandler(handler) {
    this.searchBtn.addEventListener('click', e => {
      e.preventDefault();
      handler();
    });
  }
  getQuery() {
    return this.searchElement.value;
  }
  clearInput() {
    this.searchElement.value = '';
    this.searchElement.blur();
  }
}
export default new SearchView();
