import axios from "axios";
import { api, headers } from "./config";

export const fetchStandings = async function() {
  try {
    const response = await axios.get(api.URL_STANDINGS + api.SERIE_A, { headers });
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchStandings Error! \n", error);
    return error;
  }
};
