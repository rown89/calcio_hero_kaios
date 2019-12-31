import axios from "axios";
import { api, headers } from "./config";

export const fetchLineups = async function(id) {
  try {
    const response = await axios.get(
      api.URL_LINEUPS + id,
      { headers }
    );
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchLineups Error! \n", error);
    return error;
  }
};


