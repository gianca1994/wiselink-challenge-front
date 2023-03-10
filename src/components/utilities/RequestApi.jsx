import axios from "axios";
import { notify } from "./Utilities";

const API_URL = "http://localhost:8080/api/v1/";

export async function getReq(route, headers) {
  try {
    const config = headers ? { headers } : {};
    const response = await axios.get(API_URL + route, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}

export async function postReq(route, objectData, headers) {
  try {
    const data = objectData ? objectData : {};
    const config = headers ? { headers } : {};
    const response = await axios.post(API_URL + route, data, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}

export async function deleteReq(route, headers) {
  try {
    const config = headers ? { headers } : {};
    const response = await axios.delete(API_URL + route, config);

    if (response.status === 200) return response;
  } catch (err) {
    if (err.request.status !== 0) {
      notify(err.response.data.message);
    }
  }
}
