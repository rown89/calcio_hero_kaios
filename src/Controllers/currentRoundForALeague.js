import axios from "axios";
import { api, headers } from "./config";

export const fetchCurrentRoundForALeague = async function() {
  try {
    const response = await axios.get(
      api.URL_CURRENT_ROUND_FOR_A_LEAGUE + `/${api.SERIE_A}/current`,
      { headers }
    );
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchCurrentRoundForALeague Error! \n", error);
    return error;
  }
};
