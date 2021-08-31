import axios from "axios";
import apiData from "../API/apiData";
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from "./types";
import * as Location from "expo-location";
import qs from "qs";

const JOB_ROOT_URL = "http://api.indeed.com/ads/apisearch?";
const API_KEY = "4201738803816157";
const JOB_QUERY_PARAMS = {
  publisher: API_KEY,
  format: "json",
  v: "2",
  latlong: 1,
  radius: 10, //miles
  q: "javascript",
};

const buildJobsUrl = (zip) => {
  const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
  return `${JOB_ROOT_URL}${query}`;
};
export const fetchJobs = (region, callback) => async (dispatch) => {
  try {
    let [zip] = await Location.reverseGeocodeAsync(region);
    console.log(`zip: ${zip.region}`);
    const url = buildJobsUrl(zip.region);
    console.log(`url: ${url}`);
    // let { data } = await axios.get(url);
    let { results } = apiData();
    dispatch({ type: FETCH_JOBS, payload: results });
    callback();
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const likeJob = (job) => {
  return { type: LIKE_JOB, payload: job };
};
export const clearLikedJobs = () => {
  return { type: CLEAR_LIKED_JOBS };
};
