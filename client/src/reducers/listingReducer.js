import {
  FETCH_LISTING,
  FETCH_LISTINGS,
  DELETE_LISTING,
  CREATE_LISTING,
  EDIT_LISTING,
} from "../actions/types";
import _ from "lodash";
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_LISTING:
      return { ...state, [action.payload.shortid]: action.payload };
    case FETCH_LISTINGS:
      return { ...state, ..._.mapKeys(action.payload, "shortid") };
    case CREATE_LISTING:
      return { ...state, [action.payload.shortid]: action.payload };
    case EDIT_LISTING:
      return { ...state, [action.payload.shortid]: action.payload };
    case DELETE_LISTING:
      return _.omit(state, action.payload);
    default:
      return state;
  }
}
