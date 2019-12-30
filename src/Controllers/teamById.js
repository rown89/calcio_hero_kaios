import axios from "axios";
import { api, headers } from "./config";

export const fetchTeamById = async function(id) {
  try {
    const response = await axios.get(api.URL_TEAM_BY_ID + id, { headers });
    const body = await response;
    return body;
  } catch (error) {
    console.log("fetchTeamById Error! \n", error);
    return error;
  }
};
