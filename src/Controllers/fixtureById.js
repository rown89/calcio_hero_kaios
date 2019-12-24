import axios from "axios";
import { api, headers } from "./config";

export const fetchFixtureById = async function(id) {
  try {
    const response = await axios.get(api.URL_FIXURES_BY_ID + id, { headers });
    const body = await response;
    return body;
  } catch (error) {
    console.log("fixtureById Error! \n", error);
    return error;
  }
};
