import { FETCH_USER } from "../actions/types";
export default function (state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      //console.log("FETCH USER STATE", state);
      //console.log("FETCH USER ACTION", action.payload);
      // Empty action.payload "" is falsy value
      return action.payload || false;
    default:
      return state;
  }
}
