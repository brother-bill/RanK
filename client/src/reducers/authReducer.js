import { FETCH_USER } from "../actions/types";
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // Empty action.payload "" is falsy value
      return action.payload || false;
    default:
      return state;
  }
}
