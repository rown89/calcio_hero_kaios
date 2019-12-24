import axios from "axios";
import { api, headers } from "./config";

export const fetchAllSeasons = async function() {
  try {
    const response = await axios.get(
      api.URL_ALL_SEASON + api.SERIE_A,
      { headers }
    );
    const body = await response;
    console.log(body)
    return body;
  } catch (error) {
    console.log("fetchAlllSeasons Error! \n", error);
    return error;
  }
};
