import axios from "axios";
import history from "../history";
import {
  FETCH_USER,
  FETCH_LISTINGS,
  FETCH_LISTING,
  DELETE_LISTING,
  CREATE_LISTING,
  EDIT_LISTING,
} from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const createList = (values) => async (dispatch) => {
  console.log(values);
  const res = await axios.post("/api/listings", values);
  history.push("/listings");
  dispatch({ type: CREATE_LISTING, payload: res.data });
};

export const editListing = (id, formValues) => async (dispatch) => {
  const res = await axios.patch(`/api/listing/edit/${id}`, formValues);
  dispatch({ type: EDIT_LISTING, payload: res.data });
  history.push(`/listings/show/${id}`);
};

export const fetchListings = () => async (dispatch) => {
  const res = await axios.get("/api/listings");
  dispatch({ type: FETCH_LISTINGS, payload: res.data });
};

export const fetchListing = (id) => async (dispatch) => {
  //console.log("FETCH LISTING INDEX ACTION", id);
  const res = await axios.get("/api/listing", { params: { id: id } });
  dispatch({ type: FETCH_LISTING, payload: res.data });
};

export const deleteListing = (id) => async (dispatch) => {
  //console.log("DELETING INDEX ACTION", id);
  await axios.delete(`/api/listing/delete/${id}`);
  dispatch({ type: DELETE_LISTING, payload: id });
  history.push("/listings");
};
