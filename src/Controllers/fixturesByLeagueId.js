import axios from "axios";
import { api, headers } from "./config";

export const fetchFixturesByLeagueId = async function(season) {
  try {
    const response = await axios.get(
      api.URL_FIXURES_BY_LEAGUE + season,
      { headers }
    );
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchFixturesByLeagueId Error! \n", error);
    return error;
  }
};
