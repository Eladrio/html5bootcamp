import { ADD_MOVIE, DELETE_MOVIE, EDIT_MOVIE, HANDLE_EDIT_MOVIE } from "../constants/action-types";

const initialState = {
  movies : {},
  moviesId : [],
  editingId : -1
};

function appReducer(state = initialState, action) {

  if (action.type === ADD_MOVIE) {
    let newId = state.moviesId.length;
    let movs = {...state.movies};
    movs[newId] = action.payload;
    let newState = {
      ...state,
      movies: movs,
      moviesId: [...state.moviesId, newId]
    }
    return newState;
  }

  if (action.type === DELETE_MOVIE) {
    let newMoviesId = state.moviesId.filter((item) => {
      return item !== action.id;
    });
    let copyMovies = {...state.movies};
    delete copyMovies[action.id];
    let newState = {
      ...state,
      movies: copyMovies,
      moviesId: newMoviesId
    }
    return newState;
  }

  if (action.type === HANDLE_EDIT_MOVIE) {
    return {
      ...state,
      editingId: action.id
    }
  }

  if (action.type === EDIT_MOVIE) {
      let movs = {...state.movies};
      movs[state.editingId] = action.input;
      let newState = {
        ...state,
        movies: movs,
        editingId: -1
      }
      return newState;
    };

    return state;
}

export default appReducer;