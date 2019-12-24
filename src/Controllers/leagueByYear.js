import axios from "axios";
import { api, headers } from "./config";

export const fetchLeagueByYear = async function() {
  let date = new Date();
  let year = date.getFullYear();
  try {
    const response = await axios.get(
      api.URL_AVAIBLE_SEASONS_FOR_LEAGUE_BY_SEASON + `/${api.SERIE_A}/${year}`,
      { headers }
    );
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchLeagueByYear Error! \n", error);
    return error;
  }
};
