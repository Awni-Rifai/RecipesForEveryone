import View from './views.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class BookmarkView extends View {
  parentElement = document.querySelector('.bookmarks__list');
  data;
  errorMessage = ' No bookmarks yet. Find a nice recipe and bookmark it :)';
  oldRecipe;

  _generateMarkup() {
    return previewView._generateMarkup(this.data);
  }
  bookmarksEventHandler(handler) {
    window.addEventListener('load', function () {
      handler();
    });
  }
}
export default new BookmarkView();
