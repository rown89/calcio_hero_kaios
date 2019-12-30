import axios from "axios";
import { api, headers } from "./config";

export const fetchTeamStatistics = async function(id) {
  try {
    const response = await axios.get(api.URL_TEAM_STATISTICS + api.SERIE_A + '/' + id, { headers });
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchTeamStatistics Error! \n", error);
    return error;
  }
};
