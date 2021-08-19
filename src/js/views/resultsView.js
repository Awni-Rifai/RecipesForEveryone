import icons from 'url:../../img/icons.svg';
import Views from './views';
import previewView from './previewView';
class ResultsView extends Views {
  parentElement = document.querySelector('.results');
  data;
  errorMessage = 'Sorry there is no results available for your search';
  //oldRecipe;

  _generateMarkup() {
    return previewView._generateMarkup(this.data);
  }
  hideResultsReload() {
    window.addEventListener('load', function () {
      const error = document.querySelector('div.error');
      if (!error) return;

      error.textContent = '';
    });
  }
  //Another method for marking the selected element
  // resultsEventHandler() {
  //   this.parentElement.addEventListener('click', e => {
  //     //define a variable outside the method to make the focus method works
  //     if (this.oldRecipe)
  //       this.oldRecipe.classList.remove('preview__link--active');

  //     const activeRecipe = e.target.closest('.preview__link');
  //     this.oldRecipe = activeRecipe;
  //     if (!activeRecipe) return;

  //     activeRecipe.classList.add('preview__link--active');
  //   });
  // }
}
export default new ResultsView();
