import axios from "axios";
import { FETCH_USER, FETCH_LISTINGS, FETCH_LISTING } from "./types";

export const fetchUser = () => async (dispatch) => {
  const res = await axios.get("/api/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitList = (values, history) => async (dispatch) => {
  const res = await axios.post("/api/listings", values);
  history.push("/listings");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchListings = () => async (dispatch) => {
  const res = await axios.get("/api/listings");
  dispatch({ type: FETCH_LISTINGS, payload: res.data });
};

export const fetchListing = (id) => async (dispatch) => {
  const res = await axios.get("/api/listing", { params: { id: id } });
  dispatch({ type: FETCH_LISTING, payload: res.data });
};
