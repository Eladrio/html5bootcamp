import { ADD_MOVIE } from "../constants/action-types";
import { DELETE_MOVIE } from "../constants/action-types";
import { HANDLE_EDIT_MOVIE } from "../constants/action-types";
import { EDIT_MOVIE } from "../constants/action-types";

export function addMovie(payload) {
  return { type: ADD_MOVIE, payload };
}

export function deleteMovie(id) {
  return { type: DELETE_MOVIE, id};
}

export function handleEditMovie(id) {
  return { type: HANDLE_EDIT_MOVIE, id};
}

export function editMovie(input) {
  return { type: EDIT_MOVIE, input};
}