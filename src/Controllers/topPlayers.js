import axios from "axios";
import { api, headers } from "./config";

export const fetcTopPlayers = async function() {
  try {
    const response = await axios.get(
      api.URL_TOPSCORERS + api.SERIE_A,
      { headers }
    );
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetcTopPlayers Error! \n", error);
    return error;
  }
};


