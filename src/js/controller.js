import * as model from './model.js';

import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';

//polyfilling
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import resultsView from './views/resultsView.js';
import bookmarkView from './views/bookmarkView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';
import { TIME_FOR_SUBMIT } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    recipeView.renderSpinner();
    //update results view to mark selected search results

    resultsView.update(model.getSearchResultsPage());

    await model.loadRecipe(id);
    const { recipe } = model.state;

    recipeView.render(model.state.recipe);
    //update bookmark list
    bookmarkView.update(model.state.bookmarks);
  } catch (err) {
    recipeView.renderError();
  }
};
const controlSearchResults = async function () {
  try {
    //get search query
    const query = searchView.getQuery();
    if (query === '') return;
    resultsView.renderSpinner();
    //load search results
    await model.loadSearchResults(query);
    //render search results

    if (model.state.search.results.length === 0)
      throw new Error('There is no search results');
    model.state.search.page = 1;
    showPage();
  } catch (err) {
    resultsView.renderError();
  }
};
const showPage = function () {
  searchView.clearInput();

  resultsView.render(model.getSearchResultsPage());

  paginationView.render(model.state.search);
};
const controlPage = function (e) {
  const prevBtn = document.querySelector('.pagination__btn--prev');
  const nextBtn = document.querySelector('.pagination__btn--next');
  const numPages = Math.ceil(
    model.state.search.results.length / model.state.search.resultsPerPage
  );

  if (e.target.closest('.btn--inline') === prevBtn) {
    if (model.state.search.page === 1) return;
    model.state.search.page--;
    showPage();
  }
  if (e.target.closest('.btn--inline') === nextBtn) {
    if (model.state.search.page === numPages) return;
    model.state.search.page++;
    showPage();
  }
};
const controlServings = function (action) {
  //Update the recipe servings(in state)
  let servings = model.state.recipe.servings;
  if (action === 'decrease' && servings === 1) return;
  //? we don't want to minipulate data directly in the controller instead we want to create a method in the model

  if (action === 'increase' && servings > 0) servings++;
  if (action === 'decrease' && servings > 1) servings--;

  model.updateServings(servings);
  //update the recipe view
  recipeView.update(model.state.recipe);
};
const bookmarkControl = function () {
  //add or remove bookmark
  model.addBookmark(model.state.recipe);
  //update recipe view
  recipeView.update(model.state.recipe);
  //render bookmarks
  //? we restored the etnrie recipe in the bookmarks so we can display them in this list
  bookmarkView.render(model.state.bookmarks);
};

async function controlAddRecipe(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    //render recipe view
    recipeView.render(model.state.recipe);
    //success message
    addRecipeView.renderMessage();
    //render bookmarks since we added a new one
    bookmarkView.render(model.state.bookmarks);
    //Changing the id in the url
    //this method allows us to change the url without reloading
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, TIME_FOR_SUBMIT * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
  }
}
const controlBookmarksAfterReload = function () {
  bookmarkView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.bookmarkHandler(bookmarkControl);
  searchView.searchHandler(controlSearchResults);
  paginationView.PageHandler(controlPage);
  bookmarkView.bookmarksEventHandler(controlBookmarksAfterReload);
  resultsView.hideResultsReload();
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log('Hello');
};

init();
