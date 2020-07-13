import { CHANGE_THEME, GET_THEME } from "../actions/types";
const INITIAL_STATE = localStorage.getItem("dark") || "true";
export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_THEME:
      return action.payload;
    case CHANGE_THEME:
      return action.payload;
    default:
      return state;
  }
}
