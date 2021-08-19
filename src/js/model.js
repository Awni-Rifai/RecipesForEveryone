import { API_URL, RESULTS_PER_PAGE, KEY } from './config.js';
import { async } from 'regenerator-runtime';
import { ajax } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RESULTS_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    cookingTime: recipe.cooking_time,
    image: recipe.image_url,
    ingredients: recipe.ingredients,
    publisher: recipe.publisher,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    title: recipe.title,
    //if a key existed then and operator will work and will make an object for the key and it will spread it;
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    const data = await ajax(`${API_URL}${id}?key=${KEY}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmarks.some(b => b.id === state.recipe.id)) {
      state.recipe.bookmarked = true;
    } else state.recipe.bookmarked = false;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await ajax(`${API_URL}?search=${query}&key=${KEY}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        key: recipe.key,
      };
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage; //9 since the slice value dosn't include the last value;

  return state.search.results.slice(start, end);
};
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    const num = (ing.quantity * newServings) / state.recipe.servings;
    ing.quantity = Math.round((num + Number.EPSILON) * 100) / 100;
  });
  state.recipe.servings = newServings;
};
const storeBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  //here we add and remove the bookmarks
  if (state.recipe.bookmarked) {
    state.recipe.bookmarked = false;
    const index = state.bookmarks.findIndex(el => el === recipe);
    state.bookmarks.splice(index, 1);
    storeBookmarks();
  } else {
    state.bookmarks.push(recipe);
    if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
    storeBookmarks();
  }
};
const init = function () {
  const storage = localStorage.getItem('bookmarks');
  if (!storage) return;
  state.bookmarks = JSON.parse(storage);
};
init();
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(
        entry => entry[0].slice(0, 10) === 'ingredient' && entry[1] !== ''
      )
      .map(ing => {
        ingArr = ing[1].split(',').map(str => str.trim());
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient format! Please use the correct format'
          );
        const [quantity, unit, description] = ingArr;
        return {
          quantity: quantity ? Number(quantity) : null,
          unit,
          description,
        };
      });
  } catch (err) {
    throw err;
  }
  //transform the data to the same format as the API
};
