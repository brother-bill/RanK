import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";
import authReducer from "./authReducer";
import listingsReducer from "./listingsReducer";
import listingReducer from "./listingReducer";
// These keys will be the properties in state in store
export default combineReducers({
  auth: authReducer,
  form: reduxForm,
  listings: listingsReducer,
  listing: listingReducer,
});
